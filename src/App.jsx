import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { TopNavbar } from "./components/layout/TopNavbar";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { CourseCatalog } from "./pages/CourseCatalog";
import { LessonDetailPage } from "./pages/LessonDetailPage";
import { QuizRunnerPage } from "./pages/QuizRunnerPage";
import { AssignmentPage } from "./pages/AssignmentPage";
import { ForumPage } from "./pages/ForumPage";
import { UserReportPage } from "./pages/UserReportPage";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { AnalyticsLogPage } from "./pages/AnalyticsLogPage";
import { StudentTablePage } from "./pages/StudentTablePage";
import { DeveloperPanel } from "./pages/DeveloperPanel";
import { TitleHeader } from "./components/common/TitleHeader";
import { Icon } from "./assets/icons";

import { useStudentData } from "./hooks/useStudentData";
import { useAdaptiveEngine } from "./hooks/useAdaptiveEngine";
import { MODUL_DATA } from "./data/courseModules";
import { QUIZ_BANK } from "./data/quizBank";
import { INITIAL_ASSIGNMENTS } from "./data/assignmentsData";
import { INITIAL_FORUM_THREADS } from "./data/forumData";

export default function App() {
  // 1. Hash Router Navigation
  const getHashRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return hash || "beranda";
  };

  const [currentRoute, setCurrentRoute] = useState(getHashRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getHashRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (route) => {
    window.location.hash = "#/" + route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. Data Mahasiswa (128 Mahasiswa dari student_clusters.csv)
  const { students, isFromCSV } = useStudentData();

  // 3. State Pengguna (Autentikasi 3 Peran)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. State Kurikulum & Modul (H5P & Page components)
  const [modules, setModules] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_modules");
      return saved ? JSON.parse(saved) : MODUL_DATA;
    } catch {
      return MODUL_DATA;
    }
  });

  // 5. State Kuis Formatif (Quiz component)
  const [quizzes, setQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_quizzes");
      return saved ? JSON.parse(saved) : QUIZ_BANK;
    } catch {
      return QUIZ_BANK;
    }
  });

  // 6. State Penugasan (Assignment & Online text submissions components)
  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_assignments");
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  // 7. State Forum Diskusi (Open Forum component)
  const [forumThreads, setForumThreads] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_forum");
      return saved ? JSON.parse(saved) : INITIAL_FORUM_THREADS;
    } catch {
      return INITIAL_FORUM_THREADS;
    }
  });

  // 8. State Modul Selesai & Pengumuman
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_completed");
      return saved ? JSON.parse(saved) : { "MOD-01": true };
    } catch {
      return { "MOD-01": true };
    }
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_announcements");
      return saved
        ? JSON.parse(saved)
        : [
            {
              judul: "Tugas Praktik 01: Analisis Vektor Serangan DDoS & Wireshark",
              isi: "Pelajari modul 'Anatomi Serangan DDoS', unduh sampel file PCAP, dan kerjakan penugasan mandiri sebelum tanggal batas waktu.",
              waktu: "Diterbitkan Dosen Pengampu"
            },
            {
              judul: "Pemberitahuan Sistem: Personalisasi Berbasis FSLSM Aktif",
              isi: "Profil pembelajaran Anda telah diselaraskan secara otomatis dengan klaster gaya belajar hasil K-Means Clustering.",
              waktu: "Sistem Pembelajaran Adaptif"
            }
          ];
    } catch {
      return [];
    }
  });

  // Sinkronisasi LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem("ruang_user", JSON.stringify(user));
    else localStorage.removeItem("ruang_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("ruang_modules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem("ruang_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem("ruang_assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("ruang_forum", JSON.stringify(forumThreads));
  }, [forumThreads]);

  useEffect(() => {
    localStorage.setItem("ruang_completed", JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem("ruang_announcements", JSON.stringify(announcements));
  }, [announcements]);

  // 9. Mesin Adaptif ALS (FSLSM x K-Means)
  const studentCluster = user?.cluster !== undefined ? user.cluster : 1;
  const { profile, preferredFormat, adaptedModules } = useAdaptiveEngine(studentCluster, modules);

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "d") navigate("dosen");
    else if (userData.role === "dev") navigate("dev");
    else navigate("beranda");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("beranda");
  };

  // Learning Actions
  const handleOpenLesson = (moduleId) => {
    navigate(`lesson:${moduleId}`);
  };

  const handleStartQuiz = (moduleId) => {
    navigate(`kuis:${moduleId}`);
  };

  const handleMarkComplete = (moduleId) => {
    setCompletedModules((prev) => ({
      ...prev,
      [moduleId]: true
    }));
  };

  // Assignment Actions (Online Text Submissions & Grading)
  const handleSubmitAssignment = (assignmentId, submissionPayload) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === assignmentId
          ? {
              ...item,
              status: "Menunggu Penilaian",
              submissionData: submissionPayload
            }
          : item
      )
    );
  };

  const handleGradeAssignment = (assignmentId, score, feedback) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === assignmentId
          ? {
              ...item,
              status: "Dinilai",
              nilai: score,
              feedbackDosen: feedback
            }
          : item
      )
    );
  };

  // Forum Actions
  const handleAddThread = (newThread) => {
    setForumThreads((prev) => [newThread, ...prev]);
  };

  const handleAddReply = (threadId, newReply) => {
    setForumThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              balasan: [...(t.balasan || []), newReply]
            }
          : t
      )
    );
  };

  const handleAddModule = (newMod) => {
    setModules((prev) => [newMod, ...prev]);
  };

  const handleAddAnnouncement = (newAnn) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const handleResetData = () => {
    localStorage.clear();
    setModules(MODUL_DATA);
    setQuizzes(QUIZ_BANK);
    setAssignments(INITIAL_ASSIGNMENTS);
    setForumThreads(INITIAL_FORUM_THREADS);
    setCompletedModules({ "MOD-01": true });
    alert("Seluruh data berhasil direset ke setelan awal riset.");
    navigate("beranda");
  };

  // Jika belum login, tampilkan halaman Login
  if (!user) {
    return <LoginPage onLogin={handleLogin} studentList={students} />;
  }

  // Routing Handler
  const renderCurrentPage = () => {
    const [routeName, routeParam] = currentRoute.split(":");

    if (routeName === "lesson") {
      const activeModul = modules.find((m) => m.id === routeParam) || modules[0];
      return (
        <LessonDetailPage
          modul={activeModul}
          quizList={quizzes}
          preferredFormat={preferredFormat}
          isCompleted={!!completedModules[activeModul?.id]}
          onStartQuiz={handleStartQuiz}
          onMarkComplete={handleMarkComplete}
          onNavigate={navigate}
        />
      );
    }

    if (routeName === "kuis") {
      const activeModul = modules.find((m) => m.id === routeParam) || modules[0];
      return (
        <QuizRunnerPage
          modul={activeModul}
          questions={quizzes[activeModul?.id] || []}
          onFinishQuiz={(modId) => handleMarkComplete(modId)}
          onNavigate={navigate}
        />
      );
    }

    switch (routeName) {
      case "beranda":
        return (
          <StudentDashboard
            user={user}
            profile={profile}
            adaptedModules={adaptedModules}
            completedModules={completedModules}
            announcements={announcements}
            onOpenLesson={handleOpenLesson}
            onNavigate={navigate}
          />
        );

      case "materi":
        return (
          <CourseCatalog
            modules={adaptedModules}
            completedModules={completedModules}
            onOpenLesson={handleOpenLesson}
          />
        );

      case "tugas":
        return (
          <AssignmentPage
            assignments={assignments}
            user={user}
            onSubmitAssignment={handleSubmitAssignment}
            onGradeAssignment={handleGradeAssignment}
          />
        );

      case "forum":
        return (
          <ForumPage
            threads={forumThreads}
            user={user}
            onAddThread={handleAddThread}
            onAddReply={handleAddReply}
          />
        );

      case "nilai":
        return (
          <UserReportPage
            user={user}
            profile={profile}
            modules={modules}
            completedModules={completedModules}
            quizzes={quizzes}
            assignments={assignments}
          />
        );

      case "riwayat":
        return (
          <>
            <TitleHeader
              title="Riwayat & Progres Belajar"
              subtitle="Pantau capaian penyelesaian modul kurikulum Anda."
            />
            <div className="kartu besar masuk">
              <h3>Daftar Modul yang Telah Diselesaikan</h3>
              <p className="cap">Modul-modul berikut telah Anda tuntaskan pemahamannya:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                {Object.keys(completedModules).map((modId) => {
                  const m = modules.find((mod) => mod.id === modId);
                  return (
                    <div
                      key={modId}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        background: "var(--ok-bg)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(32,134,78,0.3)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Icon name="check-circle" size={18} color="var(--ok)" />
                        <div>
                          <b style={{ fontSize: "13px", color: "var(--ok)" }}>{m?.t || modId}</b>
                          <span className="cap" style={{ display: "block" }}>{m?.trackTitle} • {m?.menit} menit</span>
                        </div>
                      </div>
                      <button className="tombol alt" onClick={() => handleOpenLesson(modId)} style={{ padding: "6px 12px", fontSize: "11px" }}>
                        Buka Ulang
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );

      case "notif":
        return (
          <>
            <TitleHeader
              title="Pemberitahuan & Pengumuman Akademik"
              subtitle="Pesan penugasan dari dosen pengampu dan pembaruan sistem adaptif."
            />
            <div className="kartu besar masuk">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {announcements.map((item, idx) => (
                  <div key={idx} style={{ padding: "16px", background: "var(--lav-terang)", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ungu)" }}>
                      <Icon name="bell" size={16} />
                      <b style={{ fontSize: "13px" }}>{item.judul}</b>
                    </div>
                    <p style={{ marginTop: "6px", fontSize: "12px", lineHeight: "1.5", color: "var(--teks)" }}>
                      {item.isi}
                    </p>
                    <span className="cap" style={{ display: "block", marginTop: "6px" }}>{item.waktu}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "dosen":
      case "kelola":
        return (
          <TeacherDashboard
            modules={modules}
            announcements={announcements}
            onAddModule={handleAddModule}
            onAddAnnouncement={handleAddAnnouncement}
            onNavigate={navigate}
          />
        );

      case "analisis-log":
        return <AnalyticsLogPage students={students} isFromCSV={isFromCSV} />;

      case "data-mhs":
        return <StudentTablePage students={students} />;

      case "dev":
        return (
          <DeveloperPanel
            user={user}
            onSwitchUser={(simUser) => setUser(simUser)}
            onResetData={handleResetData}
            onNavigate={navigate}
          />
        );

      default:
        return (
          <StudentDashboard
            user={user}
            profile={profile}
            adaptedModules={adaptedModules}
            completedModules={completedModules}
            announcements={announcements}
            onOpenLesson={handleOpenLesson}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="app">
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
      />

      <div className="kolom-utama">
        <TopNavbar
          currentRoute={currentRoute}
          user={user}
          onNavigate={navigate}
          onLogout={handleLogout}
        />

        <main className="isi masuk" key={currentRoute}>
          {renderCurrentPage()}

          <footer style={{ marginTop: "32px", paddingTop: "18px", borderTop: "1px solid var(--garis)", textAlign: "center" }}>
            <p className="cap">
              <b>ruang.</b> — Sistem Pembelajaran Adaptif (Adaptive Learning System) berbasis FSLSM × K-Means Clustering & Random Forest.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
