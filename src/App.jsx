import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

const missions = [
  {
    title: "ตั้งเป้าหมายการออม",
    description: "ให้นักเรียนเลือกเป้าหมายเล็ก ๆ แล้วเห็นความคืบหน้าแบบเกม",
    badge: "Goal",
  },
  {
    title: "บันทึกเหรียญรายวัน",
    description: "แปลงการออมแต่ละครั้งเป็นคะแนนประสบการณ์และรางวัล",
    badge: "Coins",
  },
  {
    title: "ภารกิจในห้องเรียน",
    description: "ครูสร้างโจทย์สนุก ๆ เพื่อฝึกวางแผนและตัดสินใจเรื่องเงิน",
    badge: "Quest",
  },
];

const authMessages = {
  "auth/email-already-in-use": "อีเมลนี้ถูกสมัครสมาชิกแล้ว",
  "auth/invalid-email": "รูปแบบอีเมลไม่ถูกต้อง",
  "auth/invalid-credential": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
  "auth/missing-password": "กรุณากรอกรหัสผ่าน",
  "auth/weak-password": "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
  "auth/too-many-requests": "มีการลองเข้าสู่ระบบหลายครั้ง กรุณาลองใหม่ภายหลัง",
  "auth/operation-not-allowed": "ยังไม่ได้เปิดใช้งาน Email/Password ใน Firebase Authentication",
};

function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (isRegister && !name.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้งาน");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (authError) {
      setError(authMessages[authError.code] || "ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Saving Adventure">
        <div className="brand-mark">฿</div>
        <p className="eyebrow">Saving Adventure School</p>
        <h1>เปลี่ยนการออม<br />ให้เป็นการผจญภัย</h1>
        <p className="auth-lead">
          เรียนรู้การออมผ่านภารกิจ เก็บแต้ม ปลดล็อกความสำเร็จ และสร้างนิสัยทางการเงินที่ดี
        </p>
        <div className="feature-pills">
          <span>🎯 ภารกิจการออม</span>
          <span>⭐ เก็บเลเวล</span>
          <span>🏆 แข่งขันอย่างสร้างสรรค์</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <span className="mobile-brand">฿</span>
            <p>{isRegister ? "เริ่มต้นการผจญภัย" : "ยินดีต้อนรับกลับมา"}</p>
            <h2>{isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</h2>
            <span>
              {isRegister
                ? "สร้างบัญชีเพื่อเริ่มบันทึกการออม"
                : "เข้าสู่บัญชี Saving Adventure ของคุณ"}
            </span>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="เลือกประเภทการเข้าใช้งาน">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              สมัครสมาชิก
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                ชื่อผู้ใช้งาน
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="ชื่อของคุณ"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              อีเมล
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              รหัสผ่าน
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isRegister ? "อย่างน้อย 6 ตัวอักษร" : "กรอกรหัสผ่าน"}
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={6}
                required
              />
            </label>

            {isRegister && (
              <label>
                ยืนยันรหัสผ่าน
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </label>
            )}

            {error && <div className="auth-error" role="alert">{error}</div>}

            <button className="submit-button" type="submit" disabled={loading}>
              {loading
                ? "กำลังดำเนินการ..."
                : isRegister
                  ? "สร้างบัญชี"
                  : "เข้าสู่ระบบ"}
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isRegister ? "login" : "register")}
            >
              {isRegister ? "เข้าสู่ระบบ" : "สมัครสมาชิกฟรี"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

function Dashboard({ user }) {
  return (
    <main className="app-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Saving Adventure School</p>
          <h1>สวัสดี {user.displayName || user.email}</h1>
        </div>
        <button className="logout-button" type="button" onClick={() => signOut(auth)}>
          ออกจากระบบ
        </button>
      </header>

      <section className="mission-grid" aria-label="ภารกิจเริ่มต้น">
        {missions.map((mission) => (
          <article className="mission-card" key={mission.title}>
            <span>{mission.badge}</span>
            <h2>{mission.title}</h2>
            <p>{mission.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return (
      <main className="loading-screen">
        <div className="brand-mark">฿</div>
        <p>กำลังโหลด Saving Adventure...</p>
      </main>
    );
  }

  return user ? <Dashboard user={user} /> : <AuthScreen />;
}

export default App;
