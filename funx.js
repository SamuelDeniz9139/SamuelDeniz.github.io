let pageLink="";
let clients=["Crossroads of Caring","Agape Haven of Abundance"];
let urls=["https://www.crossroadsofcaring.org/","https://www.agapehavenofabundance.org/"];
let progs=["Completed on September 6, 2024","Set to begin on October 7, 2024"];
let deets=[["Redesigned the organization's Squarespace website to make it more professional.",
        "Ensured that the website remained user-friendly on both desktop and moblie devices.",
        "The final product is far easier to navigate and less dependent on text than the original website."],
        ["Set to renovate the organization's website to be more professional and consistent.",
        "Set to implement additional pages onto the website, including a dedicated page for staff bios.",
        "Set to bolster the organization's fundraiser efforts through both its website and social media."]];
function viewWork(site){//sends you to any of my listed work
    window.location.href=site;
}
function changePage(sp){
    window.location.href+=sp;
}