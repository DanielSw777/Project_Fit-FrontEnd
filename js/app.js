const sidebar = document.getElementById("sidebarFull");
const buttonClose = document.getElementById("close-sidebar");
const buttonOpen = document.getElementById("open-sidebar");
const buttonScroll = document.getElementById("buttonScroll");
const root = document.documentElement;

function closeSidebar() {
    sidebar.style.width = "0";
    sidebar.style.padding = "0.7rem 0";
}

function openSidebar() {
    sidebar.style.padding = "0.7rem";
    sidebar.style.width = "100%";
}

function scrollToTop() {
    root.scrollTo({ top: 0, behavior: "smooth" });
}

buttonClose.addEventListener("click", closeSidebar);
buttonOpen.addEventListener("click", openSidebar);
buttonScroll.addEventListener("click", scrollToTop);
