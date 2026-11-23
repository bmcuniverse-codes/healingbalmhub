// All destinations are managed in links.json. Update that file to change website links.
(async function () {
  const defaults = {
    home:"#home", about:"#about", services:"#services", approach:"#approach",
    contact:"#contact", whatsapp:"https://wa.me/", phone:"tel:+2348033253757", email:""
  };
  let links = {...defaults};
  try {
    const response = await fetch("./links.json", {cache:"no-store"});
    if (response.ok) links = {...defaults, ...(await response.json())};
  } catch (error) {
    console.warn("Could not load links.json; using built-in fallback links.", error);
  }

  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    if (links[key]) element.setAttribute("href", links[key]);
  });

  const emailLink = document.querySelector(".email-method");
  const emailLabel = document.querySelector("[data-email-label]");
  if (!links.email) {
    emailLink?.classList.add("is-unconfigured");
    if (emailLabel) emailLabel.textContent = "Email address to be added";
    if (emailLink) emailLink.removeAttribute("href");
    if (emailLink) emailLink.setAttribute("aria-disabled", "true");
  } else {
    if (emailLink) emailLink.href = links.email.startsWith("mailto:") ? links.email : `mailto:${links.email}`;
    if (emailLabel) emailLabel.textContent = links.email.replace(/^mailto:/, "");
  }

  // The flyer lists a WhatsApp number with 10 digits. Keep the CTA visible but
  // use the general WhatsApp entry point until a verified international number is added to links.json.
  const whatsappLink = document.querySelectorAll('[data-link="whatsapp"]');
  whatsappLink.forEach(a => {
    if (!links.whatsapp || links.whatsapp === "https://wa.me/") {
      a.href = "https://wa.me/";
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("done"), 2500);
  });
  // Safety fallback if a browser delays the load event.
  setTimeout(() => loader?.classList.add("done"), 4000);

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Hello Healing Balm Hub,\n\nMy name is ${name}.\nI would like to enquire about: ${service}.\n\n${message}`;
    const configuredEmail = links.email;
    const waUrl = links.whatsapp && links.whatsapp !== "https://wa.me/" ? links.whatsapp : "";
    if (configuredEmail) {
      const address = configuredEmail.replace(/^mailto:/, "");
      window.location.href = `mailto:${address}?subject=${encodeURIComponent("Consultation enquiry - Healing Balm Hub")}&body=${encodeURIComponent(body)}`;
    } else if (waUrl) {
      const separator = waUrl.includes("?") ? "&" : "?";
      window.open(`${waUrl}${separator}text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      note.textContent = "Please use the call or WhatsApp contact above. Add a verified WhatsApp number or email address in links.json to enable direct form delivery.";
      note.classList.add("form-warning");
    }
  });
})();