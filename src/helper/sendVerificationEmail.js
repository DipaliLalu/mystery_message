import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/verificationEmail";

async function sendVerificationEmail(email,username,verifyCode) {
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Meassage | Verification code',
            react: VerificationEmail({username,opt:verifyCode}),
          });

         return {success:true,message:'Verification email send successfully'} 
    } catch (error) {
        console.log('Error sending verification email')
        return {success:false,message:'Failed to send verification email '} 
    }
}
export default sendVerificationEmail