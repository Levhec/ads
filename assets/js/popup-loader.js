document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("popup-overlay");
  const popupBox = document.getElementById("popup-box");

  if (!overlay || !popupBox) return;

  function openPopup(file) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error("Fichier popup introuvable : " + file);
        }
        return response.text();
      })
      .then(html => {
        popupBox.innerHTML = `
          <span class="popup-close" aria-label="Fermer">&times;</span>
          ${html}
        `;
        overlay.style.display = "block";
        popupBox.style.display = "block";

        const closeBtn = popupBox.querySelector(".popup-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", closePopup);
        }
      })
      .catch(error => {
        popupBox.innerHTML = `
          <span class="popup-close" aria-label="Fermer">&times;</span>
          <div class="popup-content">
            <h2>Erreur</h2>
            <p>Impossible de charger la fenêtre demandée.</p>
            <p style="font-size:13px;opacity:0.8;">${error.message}</p>
          </div>
        `;
        overlay.style.display = "block";
        popupBox.style.display = "block";

        const closeBtn = popupBox.querySelector(".popup-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", closePopup);
        }
      });
  }

  function closePopup() {
    overlay.style.display = "none";
    popupBox.style.display = "none";
    popupBox.innerHTML = "";
  }

  document.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-popup]");
    if (trigger) {
      e.preventDefault();
      openPopup(trigger.getAttribute("data-popup"));
    }
  });

  overlay.addEventListener("click", closePopup);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup();
    }
  });
});
