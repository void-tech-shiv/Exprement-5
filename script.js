"use strict";
function validateEnquiry(name,email,message){return typeof name==="string"&&name.trim().length>=2&&name.trim().length<=80&&typeof email==="string"&&email.trim().length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())&&typeof message==="string"&&message.trim().length>=5&&message.trim().length<=500;}
function menuState(isMobile,isOpen){return {hidden:isMobile&&!isOpen,expanded:isMobile&&isOpen,toggleHidden:!isMobile};}
if(typeof module!=="undefined"&&module.exports)module.exports={validateEnquiry,menuState};
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.getElementById("nav-toggle"),nav=document.getElementById("nav-menu"),media=window.matchMedia("(max-width:740px)");
 let open=false;
 function render(){const state=menuState(media.matches,open);nav.hidden=state.hidden;toggle.hidden=state.toggleHidden;toggle.setAttribute("aria-expanded",String(state.expanded));toggle.textContent=state.expanded?"Close menu":"Menu";}
 function close(focus){open=false;render();if(focus&&!toggle.hidden)toggle.focus();}
 toggle.addEventListener("click",()=>{open=!open;render();});
 nav.addEventListener("click",e=>{const link=e.target.closest("a");if(link&&media.matches){close(false);const target=document.getElementById(link.hash.slice(1));if(target){target.setAttribute("tabindex","-1");target.focus({preventScroll:true});}}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&open)close(true);});
 const onChange=()=>{const focused=document.activeElement;close(false);if(media.matches&&nav.contains(focused))toggle.focus();else if(!media.matches&&focused===toggle)nav.querySelector("a").focus();};
 if(media.addEventListener)media.addEventListener("change",onChange);else if(media.addListener)media.addListener(onChange);
 document.querySelector(".header").classList.add("enhanced");render();
 const form=document.getElementById("contact-form"),status=document.getElementById("form-status");
 form.addEventListener("submit",e=>{e.preventDefault();const get=id=>document.getElementById(id).value;if(!validateEnquiry(get("name"),get("email"),get("message"))){status.textContent="Please enter a valid example name, email and message.";return;}form.reset();status.textContent="Demo enquiry preview complete. No message was sent or stored.";});
 document.getElementById("contact-fields").disabled=false;
});
