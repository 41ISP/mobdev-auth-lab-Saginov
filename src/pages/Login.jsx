import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState } from "react"
import { useUserStore } from "../store/useUserStore"
import { api } from "../api/api"

const Login = () => {
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setSession = useUserStore((state) => state.setSession)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const res = await api.loginUser({ username, password })
            setSession(res)
            navigate("/")
        } catch (err) {
            const message =
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Неверное имя пользователя или пароль"
            setError(message)
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                {error.length > 0 && <div className="auth-error">{error}</div>}
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Вход</h1>
                    <p className="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            class="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            required
                            autocomplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            class="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            autocomplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" class="btn-submit">
                        Войти
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    Нет аккаунта?
                    <Link to={"/register"}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}

export default Login