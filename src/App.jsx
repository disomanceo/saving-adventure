import { firebaseConfig } from "./firebase";

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

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Saving Adventure School</p>
          <h1>เรียนรู้การออมเงินผ่านภารกิจสนุก ๆ</h1>
          <p className="lead">
            โครงเว็บใหม่พร้อมต่อ Firebase แล้ว เหมาะสำหรับพัฒนาต่อเป็นเกม/ระบบห้องเรียน
            สำหรับนักเรียนและครู
          </p>
          <div className="actions">
            <a href="#missions" className="button primary">
              ดูภารกิจเริ่มต้น
            </a>
            <a
              href="https://saving-adventure-school.web.app"
              className="button secondary"
              target="_blank"
              rel="noreferrer"
            >
              เปิดเว็บ Firebase
            </a>
          </div>
        </div>

        <div className="hero-card" aria-label="สถานะ Firebase">
          <div className="coin">฿</div>
          <h2>Firebase Ready</h2>
          <p>เชื่อมกับ project:</p>
          <code>{firebaseConfig.projectId}</code>
        </div>
      </section>

      <section className="mission-grid" id="missions" aria-label="ภารกิจเริ่มต้น">
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

export default App;
