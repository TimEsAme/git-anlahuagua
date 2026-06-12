import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";
// import User from "../views/User.vue";
// import Admin from "../views/Admin.vue";

// const routes = [
//   { path: "/", name: "Home", component: Home },
//   { path: "/login", name: "Login", component: Login },
//   // 仅仅需要普通权限即可
//   { path: "/user", name: "User", component: User, meta: { requireAuth: true } },
//   {
//     path: "/admin",
//     name: "Admin",
//     component: Admin,
//     // 需要管理员权限
//     meta: { requireAuth: true, requireAdmin: true },
//   },
// ];

const modules = import.meta.glob("../views/**/*.vue", { eager: false });
const metaModules = import.meta.glob("../views/**/**/*.meta.js", {
  eager: true,
});

// 生成路由配置
const routes = Object.keys(modules).map((filePath) => {
  // 生成路由路径
  let routePath = filePath
    .replace("../views", "")
    .replace(/\.vue$/, "")
    .replace(/\/_/g, "/:"); // 将文件名中的下划线转换为动态路由参数
  // 拆分路径并处理 index 文件名
  const parts = routePath.split("/").filter(Boolean);
  // 移除重复的目录名和文件名
  if (parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2]) {
    parts.pop();
  }

  if (parts[parts.length - 1]?.toLowerCase() === "index") {
    parts.pop();
  }

  routePath = "/" + parts.join("/").toLowerCase();

  // 导入元数据文件
  const metaFilePath = filePath.replace(".vue", ".meta.js");
  const meta = metaModules[metaFilePath]
    ? metaModules[metaFilePath].default
    : {};

  return {
    path: routePath,
    component: modules[filePath],
    ...meta,
  };
});

console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 模拟用户登录状态
let currentUserRole: any = null; // 当前用户的角色

// 再提供一些和角色配套的方法
export function login(role: string) {
  currentUserRole = role;
}

export function loginout() {
  currentUserRole = null;
}

export function getCurrentUserRole() {
  return currentUserRole;
}

// 全局前置守卫
router.beforeEach((to, from) => {
  // 判断是否需要权限
  if (to.meta.requireAuth) {
    // 做权限相关的处理
    if (!currentUserRole) {
      // 未登录
      return { name: "Login" };
    } else if (to.meta.requireAdmin && currentUserRole !== "admin") {
      // 进入此分支，说明当前角色是有值的
      // 但是你要进入的页面需要管理员权限，但是当前角色不是管理员
      return { name: "Home" };
    } else {
      return true;
    }
  } else {
    return true;
  }
});

export default router;
