import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function handler(req, res) {
  if(req.method == 'POST'){
   const { name, email, message } = await req.json();
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev' ,
      to: email,
      subject: `New Message from ${name}`,
      html :`
        <p>You have a new message from your portfolio contact form:</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
      `,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email with Resend', error);
    return NextResponse.json({ error });
  }
} else {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}


