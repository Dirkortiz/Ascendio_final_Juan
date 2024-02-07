const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function nodemailerDeleteUser(email, nickname, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_USER, // lo está mirando juanjo
      pass: process.env.NM_PASS, // VERIFIACION EN DOS PASOS Y LUEGO CONTRASEÑA DE aplicación
    },
  });

  if (email) {
    const info = await transporter.sendMail({
      from: `"Ascendio" <${process.env.NM_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Cuenta en Ascendio eliminada", // Subject line
      // text: "Hola algo bonito", // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #1D1D1B; padding-bottom: 1px">
        <div style="text-align: center; background-color: #e15252; padding: 10px; color: #fff;">
          <p style="margin: 0;">Despedida de Ascendio</p>
        </div>
        <h2 style="margin: 20px; color: #fff;">¡Hola, ${nickname && nickname.charAt(0).toUpperCase() + nickname.slice(1)}!</h2>
        <p style="margin: 20px; color: #fff;">Tu cuenta en Ascendio ha sido eliminada correctamente.</p>
        <p style="margin: 20px; color: #fff;">Te vamos a extrañar. ¡Gracias por ser parte de Ascendio!</p>
      </div>
      
      `, // html body
    });

    // console.log("Message sent: %s", info.messageId);
  }
}

module.exports = nodemailerDeleteUser;