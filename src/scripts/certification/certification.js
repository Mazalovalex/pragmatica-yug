import "../../styles/styles.css";
import certificationData from "../../data/data-certification.json";
console.log(certificationData);

const certificationList = document.querySelector(".certification-list");
console.log(certificationList);

certificationData.partners.forEach(function (certificate) {
  // Создаем LI
  const certificateItem = document.createElement("li");
  certificateItem.classList.add("certification-item");

  // Создаем ссылку
  const certificateLink = document.createElement("a");
  certificateLink.href = require("../../assets/docs/certifications/" +
    certificate.pdfLink);
  certificateLink.textContent = certificate.name;
  certificateLink.target = "_blank";

  certificateLink.rel = "noopener noreferrer";

  certificateItem.append(certificateLink);

  certificationList.append(certificateItem);
});
