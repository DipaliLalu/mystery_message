import dbConnect from "@/lib/dbConnect";
import User from "@/models/userSchema";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";

const usernameQuerySchema = z.object({
    username: usernameValidation
})
export async function GET(request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
          username: searchParams.get('username'),
        };

        const result = usernameQuerySchema.safeParse(queryParams);
        console.log('result is: ',result);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return NextResponse.json({
                success: false,
                message: usernameErrors?.length > 0
                    ? usernameErrors.join(', ')
                    : 'Invalid query parameters',
            },
                { status: 400 })
        }
        const { username } = result.data;
        const existingVerifiedUser = await User.findOne({ username, isVerify: true })
        if (existingVerifiedUser) {
            return NextResponse.json({
                success: false,
                message: "Username is taken",
            },
                { status: 200 })
        }
        return NextResponse.json({
            success: true,
            message: "Username is available",
        },
            { status: 200 })

    } catch (error) {
        console.log("Error checking username: ", error);
        return NextResponse.json({
            success: false,
            message: 'Error checking username',
        },
            { status: 500 })
    }
}