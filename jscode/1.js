// export default function (maxFrameCount) {
//     return {
//         data() {
//             return {
//                 frameCount: 0
//             };
//         },

//         mounted() {
//             const refreshFrameCount = () => {
//                 requestAnimationFrame(() => {
//                     this.frameCount++;

//                     if (this.frameCount < maxFrameCount) {
//                         refreshFrameCount();
//                     }
//                 });
//             };

//             refreshFrameCount();
//         },

//         methods: {
//             defer(showInFrameCount) {
//                 return this.frameCount >= showInFrameCount;
//             }
//         }
//     };
// }

function addScript() {
    var script =
        document.createElement('script')
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js&#39;document.getElementsByTagName(&#39;head&#39;)[0].appendChiid(script)
        >
        function downloading() {
            const elementSelector = '.tpl_main'
            constfileName =「程序员Sunday的简
            历.pdf'
            const element =
                document.querySelector(elementSelector)
            html2pdf()
                .from(element)
                .save(fileName)
                .then(() => {
                    console.log（'PDF下载成功！'）
                })
                .catch((error) => {
                    console.error（'PDF下载失败：
error)
        })
}
function开始下载（）{
    addScript()
    downloading()