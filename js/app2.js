const buttonScroll = document.getElementById("buttonScroll");
const root = document.documentElement;

function scrollToTop() {
    root.scrollTo({ top: 0, behavior: "smooth" });
}

buttonScroll.addEventListener("click", scrollToTop);
