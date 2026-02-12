import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Trophy, Flame, ChevronRight, RotateCw, CheckCircle, XCircle, Home, BarChart2, ArrowLeft, Star, Calculator, Languages, globe } from 'lucide-react';

// --- MOCK DATEN (ANGEPASST FÜR 9. KLASSE GYM BAYERN) ---
const COURSES = [
  {
    id: 1,
    title: 'Mathe - 9. Klasse',
    subtitle: 'Lambacher Schweizer',
    icon: '📐',
    color: 'bg-blue-100 text-blue-600',
    totalLessons: 24,
    completedLessons: 6,
    description: 'Quadratische Funktionen, Wurzeln & Satz des Pythagoras.',
    content: {
      flashcards: [
        { front: 'Lösungsformel (Mitternachtsformel)', back: 'x₁,₂ = (-b ± √(b² - 4ac)) / (2a)' },
        { front: 'Scheitelpunktform', back: 'f(x) = a(x - xₛ)² + yₛ' },
        { front: 'Satz des Pythagoras', back: 'a² + b² = c² (nur im rechtw. Dreieck!)' },
        { front: 'Höhensatz des Euklid', back: 'h² = p · q' },
        { front: 'Kathetensatz', back: 'a² = c · p  und  b² = c · q' },
        { front: 'Sinus (Definition)', back: 'Gegenkathete / Hypotenuse' }
      ],
      quiz: [
        {
          question: 'Wie viele Lösungen hat eine quadratische Gleichung, wenn die Diskriminante D < 0 ist?',
          options: ['Zwei Lösungen', 'Eine Lösung', 'Keine Lösung', 'Unendlich viele'],
          correct: 2
        },
        {
          question: 'Welche Bedingung muss für den Satz des Pythagoras gelten?',
          options: ['Gleichseitiges Dreieck', 'Rechtwinkliges Dreieck', 'Stumpfwinkliges Dreieck', 'Spitzwinkliges Dreieck'],
          correct: 1
        },
        {
          question: 'Was ist √144?',
          options: ['10', '11', '12', '14'],
          correct: 2
        },
        {
          question: 'In welchem Quadranten sind Sinus und Kosinus beide positiv?',
          options: ['I. Quadrant', 'II. Quadrant', 'III. Quadrant', 'IV. Quadrant'],
          correct: 0
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Spanisch (3. FS)',
    subtitle: 'Encuentros 2',
    icon: '🇪🇸',
    color: 'bg-orange-100 text-orange-600',
    totalLessons: 14,
    completedLessons: 4,
    description: 'Indefinido vs. Imperfecto, Objektpronomen & Madrid.',
    content: {
      flashcards: [
        { front: 'ser/ir (Indefinido, 1. Pers. Sg.)', back: 'fui' },
        { front: 'hacer (Indefinido, 3. Pers. Sg.)', back: 'hizo' },
        { front: 'Signalwort: ayer', back: 'Indefinido (Gestern)' },
        { front: 'Signalwort: todos los días', back: 'Imperfecto (Gewohnheit)' },
        { front: 'poner (Partizip)', back: 'puesto' },
        { front: 'decir (Indefinido, 3. Pers. Pl.)', back: 'dijeron' }
      ],
      quiz: [
        {
          question: 'Wann benutzt man das Indefinido?',
          options: ['Hintergrundbeschreibungen', 'Wiederholte Handlungen', 'Neu einsetzende Handlungen', 'Zukünftige Pläne'],
          correct: 2
        },
        {
          question: 'Wie heißt "Ich habe es gekauft" (lo = es)?',
          options: ['Lo he comprado', 'He lo comprado', 'Comprado lo he', 'Lo comprado he'],
          correct: 0
        },
        {
          question: 'Was ist KEIN Signalwort für das Indefinido?',
          options: ['ayer', 'hace un año', 'el otro día', 'siempre'],
          correct: 3
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Französisch (2. FS)',
    subtitle: 'À Plus! 4',
    icon: '🇫🇷',
    color: 'bg-purple-100 text-purple-600',
    totalLessons: 18,
    completedLessons: 2,
    description: 'Le Subjonctif, Conditionnel & La Francophonie.',
    content: {
      flashcards: [
        { front: 'Auslöser: Il faut que...', back: '... + Subjonctif' },
        { front: 'faire (Subjonctif Stamm)', back: 'fass-' },
        { front: 'aller (Subjonctif Stamm)', back: 'aill- (außer nous/vous)' },
        { front: 'Si j\'avais le temps...', back: '... je viendrais. (Typ 2)' },
        { front: 'pouvoir (Conditionnel I, 1. Pers. Sg.)', back: 'je pourrais' },
        { front: 'Auslöser: Je trouve que...', back: '... + Indikativ (meistens)' }
      ],
      quiz: [
        {
          question: 'Welcher Satz steht im Subjonctif?',
          options: ['Je sais qu\'il est là.', 'Il faut qu\'il soit là.', 'Je pense qu\'il va venir.', 'Il dit qu\'il a faim.'],
          correct: 1
        },
        {
          question: 'Bildung des Conditionnel Présent bei regelmäßigen Verben?',
          options: ['Infinitiv + avoir-Endungen', 'Infinitiv + imparfait-Endungen', 'Stamm + e, es, e...', 'Nur Infinitiv'],
          correct: 1
        },
        {
          question: 'Was drückt der "Subjonctif" oft aus?',
          options: ['Tatsachen', 'Gefühle, Wünsche, Notwendigkeiten', 'Vergangenheit', 'Besitz'],
          correct: 1
        }
      ]
    }
  }
];

// --- COMPONENTS ---

const ProgressBar = ({ current, total, colorClass = "bg-indigo-600" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
    <div 
      className={`h-2.5 rounded-full transition-all duration-500 ${colorClass}`} 
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState('dashboard'); // dashboard, course-detail, flashcards, quiz, summary
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userStats, setUserStats] = useState({ xp: 2450, streak: 12, level: 5 });
  
  // Lern-State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Für Flashcards
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Für Quiz
  const [isAnswerChecked, setIsAnswerChecked] = useState(false); // Für Quiz

  // Navigation
  const goToCourse = (course) => {
    setSelectedCourse(course);
    setView('course-detail');
  };

  const startFlashcards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setView('flashcards');
  };

  const startQuiz = () => {
    setCurrentIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setView('quiz');
  };

  const goBack = () => {
    if (view === 'course-detail') setView('dashboard');
    else if (['flashcards', 'quiz', 'summary'].includes(view)) setView('course-detail');
  };

  // Logic: Flashcards
  const nextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < selectedCourse.content.flashcards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        completeSession(100); // 100 XP für Abschluss
      }
    }, 200);
  };

  // Logic: Quiz
  const checkAnswer = (index) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
    setIsAnswerChecked(true);
    
    if (index === selectedCourse.content.quiz[currentIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    if (currentIndex < selectedCourse.content.quiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalScore = selectedAnswer === selectedCourse.content.quiz[currentIndex].correct ? quizScore + 1 : quizScore;
      completeSession(finalScore * 50); // 50 XP pro richtige Antwort
    }
  };

  // Logic: Session Complete
  const completeSession = (xpEarned) => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpEarned
    }));
    setView('summary');
  };

  // --- VIEWS ---

  const DashboardView = () => (
    <div className="p-6 max-w-4xl mx-auto pb-24">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Moin, 9. Klasse! 👋</h1>
          <p className="text-slate-500">Fit für die nächste Schulaufgabe?</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-medium shadow-sm">
            <Flame size={18} fill="currentColor" />
            <span>{userStats.streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-medium shadow-sm">
            <Trophy size={18} />
            <span>{userStats.xp} XP</span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Deine Fächer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSES.map(course => (
            <button 
              key={course.id} 
              onClick={() => goToCourse(course)}
              className="text-left hover:scale-[1.02] transition-transform duration-200"
            >
              <Card className="p-5 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-3xl w-12 h-12 flex items-center justify-center rounded-xl ${course.color}`}>
                      {course.icon}
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                      {course.completedLessons}/{course.totalLessons}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-0">{course.title}</h3>
                  <p className="text-xs font-semibold text-indigo-500 mb-1 uppercase tracking-wide">{course.subtitle}</p>
                  <p className="text-slate-500 text-sm mt-2">{course.description}</p>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Lernfortschritt</span>
                    <span>{Math.round((course.completedLessons / course.totalLessons) * 100)}%</span>
                  </div>
                  <ProgressBar current={course.completedLessons} total={course.totalLessons} />
                </div>
              </Card>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const CourseDetailView = () => (
    <div className="p-6 max-w-xl mx-auto h-full flex flex-col">
      <button onClick={goBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-1" /> Zurück zur Übersicht
      </button>

      <div className="text-center mb-8">
        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4 ${selectedCourse.color}`}>
          {selectedCourse.icon}
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-1">{selectedCourse.title}</h1>
        <p className="text-indigo-500 font-medium mb-2">{selectedCourse.subtitle}</p>
        <p className="text-slate-500">{selectedCourse.description}</p>
      </div>

      <div className="grid gap-4">
        <button 
          onClick={startFlashcards}
          className="group relative bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-center"
        >
          <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-lg">Karteikarten</h3>
            <p className="text-slate-500 text-sm">Begriffe & Formeln lernen</p>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-indigo-500" />
        </button>

        <button 
          onClick={startQuiz}
          className="group relative bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:border-pink-500 hover:shadow-md transition-all text-left flex items-center"
        >
          <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
            <Brain size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-lg">Quiz starten</h3>
            <p className="text-slate-500 text-sm">Prüfungsvorbereitung</p>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-pink-500" />
        </button>
      </div>
    </div>
  );

  const FlashcardsView = () => {
    const card = selectedCourse.content.flashcards[currentIndex];
    const progress = ((currentIndex + 1) / selectedCourse.content.flashcards.length) * 100;

    return (
      <div className="p-6 max-w-xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goBack} className="text-slate-400 hover:text-slate-600"><XCircle /></button>
          <div className="w-full max-w-[200px] h-2 bg-gray-100 rounded-full mx-4">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-sm font-medium text-slate-500">{currentIndex + 1}/{selectedCourse.content.flashcards.length}</span>
        </div>

        <div className="flex-1 flex flex-col justify-center perspective-1000">
          <div 
            className="relative w-full aspect-[4/5] md:aspect-[3/2] cursor-pointer group perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
             <div className={`
                relative w-full h-full duration-500 preserve-3d transition-all transform rounded-3xl shadow-xl
                ${isFlipped ? 'rotate-y-180' : ''}
             `}>
                {/* Vorderseite */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl border-2 border-indigo-50 flex flex-col items-center justify-center p-8 text-center shadow-sm">
                  <span className="text-indigo-200 mb-4"><RotateCw size={32} /></span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{card.front}</h3>
                  <p className="mt-8 text-sm text-slate-400 uppercase tracking-widest font-semibold">Tippen zum Umdrehen</p>
                </div>

                {/* Rückseite */}
                <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl flex flex-col items-center justify-center p-8 text-center rotate-y-180 shadow-sm text-white">
                  <h3 className="text-2xl md:text-3xl font-bold">{card.back}</h3>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={nextFlashcard}
            className="w-full max-w-xs bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
          >
            {currentIndex === selectedCourse.content.flashcards.length - 1 ? 'Abschließen' : 'Nächste Karte'}
          </button>
        </div>
        
        {/* CSS Helper for flip effect since we are in one file */}
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}</style>
      </div>
    );
  };

  const QuizView = () => {
    const question = selectedCourse.content.quiz[currentIndex];
    const progress = ((currentIndex + 1) / selectedCourse.content.quiz.length) * 100;

    return (
      <div className="p-6 max-w-xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <button onClick={goBack} className="text-slate-400 hover:text-slate-600"><XCircle /></button>
          <div className="w-full max-w-[200px] h-2 bg-gray-100 rounded-full mx-4">
            <div className="h-full bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
            Score: {quizScore}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let btnClass = "border-slate-200 hover:border-pink-300 hover:bg-pink-50 text-slate-700";
              
              if (isAnswerChecked) {
                if (idx === question.correct) btnClass = "border-green-500 bg-green-50 text-green-700";
                else if (idx === selectedAnswer) btnClass = "border-red-500 bg-red-50 text-red-700";
                else btnClass = "border-slate-100 text-slate-300";
              }

              return (
                <button
                  key={idx}
                  onClick={() => checkAnswer(idx)}
                  disabled={isAnswerChecked}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium text-lg transition-all ${btnClass} flex items-center justify-between`}
                >
                  {option}
                  {isAnswerChecked && idx === question.correct && <CheckCircle size={20} className="text-green-600" />}
                  {isAnswerChecked && idx === selectedAnswer && idx !== question.correct && <XCircle size={20} className="text-red-600" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 h-20">
          {isAnswerChecked && (
            <div className={`p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-300 ${selectedAnswer === question.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="font-bold">
                {selectedAnswer === question.correct ? 'Richtig!' : 'Leider falsch!'}
              </div>
              <button 
                onClick={nextQuestion}
                className={`px-6 py-2 rounded-lg font-bold shadow-sm ${selectedAnswer === question.correct ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Weiter
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SummaryView = () => (
    <div className="p-6 max-w-md mx-auto h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-6 animate-bounce">
        <Star size={48} fill="currentColor" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Stark gemacht!</h1>
      <p className="text-slate-500 mb-8">Lektion abgeschlossen. Weiter so!</p>
      
      <Card className="w-full p-6 mb-8 bg-slate-50 border-none">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
          <span className="text-slate-500">Gesammelte XP</span>
          <span className="font-bold text-indigo-600 text-xl">+ {userStats.xp - (userStats.xp % 50 === 0 ? userStats.xp - 50 : 2450)}</span> 
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Aktueller Streak</span>
          <span className="font-bold text-orange-600 text-xl flex items-center gap-1">
            {userStats.streak} <Flame size={16} fill="currentColor" />
          </span>
        </div>
      </Card>

      <button 
        onClick={() => setView('dashboard')}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all"
      >
        Zurück zum Dashboard
      </button>
    </div>
  );

  // --- RENDER SWITCH ---

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {view === 'dashboard' && <DashboardView />}
      {view === 'course-detail' && <CourseDetailView />}
      {view === 'flashcards' && <FlashcardsView />}
      {view === 'quiz' && <QuizView />}
      {view === 'summary' && <SummaryView />}
      
      {/* Mobile Bottom Nav (nur sichtbar im Dashboard) */}
      {view === 'dashboard' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 md:hidden">
          <div className="flex justify-around text-xs font-medium text-slate-400">
            <button className="flex flex-col items-center text-indigo-600 gap-1">
              <Home size={24} />
              Home
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-slate-600">
              <BarChart2 size={24} />
              Statistik
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
