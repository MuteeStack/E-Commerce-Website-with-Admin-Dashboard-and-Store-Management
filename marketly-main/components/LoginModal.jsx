'use client'
import { useState } from "react"
import { useAuth } from "@/lib/AuthContext"
import { XIcon } from "lucide-react"
import toast from "react-hot-toast"

const LoginModal = ({ onClose }) => {

    const { signIn, signUp, signInWithGoogle } = useAuth()

    const [isSignUp, setIsSignUp] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isSignUp) {
                await signUp(email, password, name)
                toast.success("Account created successfully!")
            } else {
                await signIn(email, password)
                toast.success("Signed in successfully!")
            }
            onClose()
        } catch (error) {
            toast.error(error.message || "Authentication failed")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        try {
            await signInWithGoogle()
            toast.success("Signed in with Google!")
            onClose()
        } catch (error) {
            toast.error(error.message || "Google sign-in failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
                    <XIcon size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {isSignUp ? "Sign up to start shopping" : "Sign in to your account"}
                    </p>
                </div>

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition active:scale-[0.98] disabled:opacity-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 border-t border-slate-200"></div>
                    <span className="text-xs text-slate-400">or</span>
                    <div className="flex-1 border-t border-slate-200"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-teal-500 transition"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-teal-500 transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-teal-500 transition"
                        required
                        minLength={6}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 active:scale-[0.98] transition disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-sm text-slate-500 mt-5">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-teal-600 font-medium hover:underline">
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginModal
