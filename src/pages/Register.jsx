import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { useUserStore } from '../store/useUserStore'
import { api } from '../api/api'

const Register = () => {
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const navigate = useNavigate()
    const setSession = useUserStore((state) => state.setSession)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== password2) {
            setError('Пароли не совпадают')
            return
        }

        try {
            const res = await api.registerUser({ username, email, password })
            setSession(res)
            navigate('/')
        } catch (err) {
            const message =
                err.response?.data?.error ||
                err.response?.data?.message ||
                'Не удалось зарегистрироваться'
            setError(message)
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">👤</div>
                    <h1 className="auth-title">Регистрация</h1>
                    <p className="auth-subtitle">Создайте новый аккаунт</p>
                </div>

                {error.length > 0 && <div className="auth-error">{error}</div>}

                <form id="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            class="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            minlength="3"
                            required
                            autocomplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="form-hint">Минимум 3 символа</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email <span className="optional">(необязательно)</span>
                        </label>
                        <Input
                            type="email"
                            class="form-input"
                            name="email"
                            placeholder="example@email.com"
                            autocomplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            class="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            minlength="6"
                            required
                            autocomplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="form-hint">Минимум 6 символов</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Подтверждение пароля</label>
                        <Input
                            type="password"
                            class="form-input"
                            name="password2"
                            placeholder="Повторите пароль"
                            required
                            autocomplete="new-password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>

                    <Button type="submit" class="btn-submit">
                        Зарегистрироваться
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    <p>
                        <Link to={'/login'}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register