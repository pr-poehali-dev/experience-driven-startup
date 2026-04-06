import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CONSULTANT_PHOTO = "https://cdn.poehali.dev/projects/a372cb81-d736-4863-af6b-3d6f18a2ccc7/files/d7c7f826-65d7-4fd0-8057-fd155b2b0dbe.jpg";
const MEETING_PHOTO = "https://cdn.poehali.dev/projects/a372cb81-d736-4863-af6b-3d6f18a2ccc7/files/b3d229a9-0010-403e-b9df-22b4de374861.jpg";

const services = [
  {
    icon: "TrendingUp",
    title: "Аудит системы продаж",
    desc: "Полный разбор текущей воронки, выявление узких мест и точек потери выручки. Конкретный план с приоритетами.",
    duration: "2 недели",
  },
  {
    icon: "Users",
    title: "Построение отдела продаж",
    desc: "Найм, адаптация, скрипты, KPI и система мотивации. Отдел, который работает без вашего постоянного участия.",
    duration: "1–3 месяца",
  },
  {
    icon: "Target",
    title: "Стратегия выхода на новые рынки",
    desc: "Исследование рынка, конкурентный анализ, каналы привлечения и дорожная карта масштабирования.",
    duration: "3–4 недели",
  },
  {
    icon: "BookOpen",
    title: "Обучение и коучинг команды",
    desc: "Практические тренинги по переговорам, работе с возражениями и закрытию крупных сделок.",
    duration: "По запросу",
  },
  {
    icon: "BarChart3",
    title: "Внедрение CRM и аналитики",
    desc: "Настройка, интеграция с бизнес-процессами и обучение команды. Управление продажами через данные.",
    duration: "2–5 недель",
  },
  {
    icon: "Handshake",
    title: "Сопровождение сделок",
    desc: "Личное участие в ключевых переговорах с крупными клиентами. Повышение конверсии в закрытие.",
    duration: "По проекту",
  },
];

const cases = [
  {
    company: "IT-дистрибьютор",
    metric: "+67%",
    label: "рост выручки за 4 месяца",
    desc: "Пересобрали отдел продаж с нуля: найм 5 менеджеров, скрипты, CRM. Выручка выросла с 18 до 30 млн/мес.",
    tags: ["B2B продажи", "Построение команды", "CRM"],
  },
  {
    company: "Строительная компания",
    metric: "×2.3",
    label: "конверсия в контракт",
    desc: "Аудит воронки показал потерю 70% лидов на этапе КП. Новые шаблоны и переговорный скрипт исправили ситуацию.",
    tags: ["Аудит", "Скрипты", "Воронка"],
  },
  {
    company: "SaaS-платформа",
    metric: "−40%",
    label: "сокращение цикла сделки",
    desc: "Внедрили методологию SPIN, переработали демо-сессии и убрали лишние согласования. Средний цикл с 90 до 54 дней.",
    tags: ["SPIN", "SaaS", "Переговоры"],
  },
];

const testimonials = [
  {
    name: "Дмитрий Савченко",
    role: "CEO, TechVision Group",
    text: "Алексей за месяц нашёл в нашей воронке потерю 12 млн рублей. Спокойно, без лишних слов, с конкретным планом. Внедрили — результат виден в цифрах.",
    rating: 5,
  },
  {
    name: "Мария Орлова",
    role: "Коммерческий директор, BuildPro",
    text: "Наконец-то консультант, который говорит на языке бизнеса, а не теорий. Команда прошла обучение и конверсия выросла с 12% до 28% за квартал.",
    rating: 5,
  },
  {
    name: "Игорь Петров",
    role: "Основатель, CloudBase",
    text: "Ожидал стандартных рекомендаций — получил глубокую работу с командой и перестройку всего процесса. Цикл сделки сократился вдвое.",
    rating: 5,
  },
];

const blogPosts = [
  {
    date: "18 марта 2026",
    category: "Стратегия",
    title: "Почему 80% B2B-компаний теряют деньги на этапе КП",
    excerpt: "Разбираем три системные ошибки в коммерческих предложениях, которые обходятся бизнесу дороже всего.",
  },
  {
    date: "5 марта 2026",
    category: "Команда",
    title: "Как нанять первого менеджера по продажам и не пожалеть",
    excerpt: "Чек-лист из 12 пунктов: от профиля кандидата до первых 30 дней в должности.",
  },
  {
    date: "19 февраля 2026",
    category: "Инструменты",
    title: "CRM: зачем она нужна и почему команды её не используют",
    excerpt: "Реальные причины низкой adoption и как выстроить систему, которой будут пользоваться.",
  },
];

const packages = [
  {
    id: "start",
    name: "Старт",
    basePrice: 90000,
    desc: "Диагностика и рекомендации",
    features: ["Аудит воронки продаж", "Отчёт с приоритетами", "1 стратегическая сессия", "Email-поддержка 2 недели"],
    popular: false,
  },
  {
    id: "growth",
    name: "Рост",
    basePrice: 250000,
    desc: "Глубокая трансформация",
    features: ["Всё из пакета «Старт»", "Скрипты и шаблоны КП", "Обучение команды (2 сессии)", "CRM-аудит и настройка", "Сопровождение 1 месяц"],
    popular: true,
  },
  {
    id: "premium",
    name: "Премиум",
    basePrice: 490000,
    desc: "Партнёрское сопровождение",
    features: ["Всё из пакета «Рост»", "Участие в ключевых сделках", "Найм и адаптация команды", "Ежемесячные стратсессии", "Прямая связь 3 месяца"],
    popular: false,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activePackage, setActivePackage] = useState("growth");
  const [sessions, setSessions] = useState(4);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pkg = packages.find((p) => p.id === activePackage)!;
  const totalPrice = pkg.basePrice + (sessions - 1) * Math.round(pkg.basePrice * 0.12);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#cases", label: "Кейсы" },
    { href: "#testimonials", label: "Отзывы" },
    { href: "#calculator", label: "Стоимость" },
    { href: "#blog", label: "Блог" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold-pale" style={{ background: 'rgba(11,18,32,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex flex-col gap-1 justify-center">
                <div className="w-full h-px bg-gold"></div>
                <div className="w-3/4 h-px bg-gold opacity-60"></div>
              </div>
              <span className="font-display text-lg font-semibold text-cream tracking-wide">А. Громов</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </div>

            <a href="#contact" className="hidden md:block btn-gold text-xs px-5 py-2.5">
              Записаться
            </a>

            <button className="md:hidden text-cream" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} fallback="Menu" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-light border-t border-gold-pale px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" className="btn-gold text-center text-xs py-3">Записаться</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={MEETING_PHOTO} alt="bg" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--navy) 40%, rgba(11,18,32,0.7) 100%)' }}></div>
        </div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <div className="animate-fade-up">
              <span className="section-label">Консультант по продажам</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-tight mt-6 animate-fade-up delay-100">
              Системный рост
              <br />
              <span className="text-gold italic font-normal">продаж</span>
              <br />
              вашего бизнеса
            </h1>
            <p className="mt-6 text-cream-muted text-base lg:text-lg leading-relaxed max-w-lg animate-fade-up delay-200 font-body">
              15 лет в B2B-продажах. 60+ реализованных проектов. Работаю с собственниками и коммерческими директорами, которые хотят предсказуемого роста — без иллюзий.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
              <a href="#calculator" className="btn-gold">Рассчитать стоимость</a>
              <a href="#cases" className="btn-outline-gold">Смотреть кейсы</a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 animate-fade-up delay-400">
              {[
                { num: "60+", label: "проектов" },
                { num: "15", label: "лет опыта" },
                { num: "×2.4", label: "средний рост выручки" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="font-display text-3xl lg:text-4xl text-gold font-semibold">{s.num}</div>
                  <div className="text-cream-muted text-xs mt-1 font-body tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-up delay-500">
            <div className="relative w-full aspect-[3/4] max-w-md ml-auto">
              <div className="absolute -inset-3 border border-gold opacity-10 rounded-sm"></div>
              <div className="absolute -inset-6 border border-gold opacity-5 rounded-sm"></div>
              <img src={CONSULTANT_PHOTO} alt="Алексей Громов" className="w-full h-full object-cover rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-40 rounded-sm"></div>
              <div className="absolute -bottom-6 -left-6 bg-navy-light border border-gold-pale p-4">
                <div className="font-display text-2xl text-gold font-semibold">№1</div>
                <div className="text-cream-muted text-xs font-body">в рейтинге Forbes</div>
                <div className="text-cream-muted text-xs">Sales Consultants 2025</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent opacity-50"></div>
          <span className="text-cream-muted text-xs tracking-widest font-body uppercase">Листайте</span>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label">Что я делаю</span>
              <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line-center">
                Услуги консультирования
              </h2>
              <p className="text-cream-muted mt-8 max-w-xl mx-auto font-body text-sm leading-relaxed">
                Каждый проект — индивидуально. Без шаблонных решений, с погружением в специфику вашего рынка и команды.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="luxury-card p-8 h-full cursor-default">
                  <div className="w-10 h-10 border border-gold-pale flex items-center justify-center mb-6">
                    <Icon name={s.icon as "Star"} size={18} className="text-gold" fallback="Star" />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-3">{s.title}</h3>
                  <p className="text-cream-muted text-sm leading-relaxed font-body mb-6">{s.desc}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-4 h-px bg-gold opacity-50"></div>
                    <span className="text-xs text-gold-light font-body">{s.duration}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 lg:py-32 bg-navy-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16">
              <span className="section-label">Результаты</span>
              <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line">
                Кейсы клиентов
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <AnimatedSection key={i}>
                <div className="luxury-card p-8 h-full flex flex-col">
                  <div className="border-b border-gold-pale pb-6 mb-6">
                    <div className="font-display text-5xl font-semibold text-gold">{c.metric}</div>
                    <div className="text-cream-muted text-xs mt-1 font-body tracking-wide">{c.label}</div>
                  </div>
                  <div className="text-cream-muted text-xs font-body uppercase tracking-wider mb-2">{c.company}</div>
                  <p className="text-cream text-sm leading-relaxed font-body flex-1">{c.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs font-body px-3 py-1 border border-gold-pale text-cream-muted">{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label">Клиенты о работе</span>
              <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line-center">
                Отзывы
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i}>
                <div className="luxury-card p-8 relative">
                  <div className="quote-mark absolute top-4 right-6">"</div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Icon key={k} name="Star" size={12} className="text-gold" fallback="Star" />
                    ))}
                  </div>
                  <p className="text-cream text-sm leading-relaxed font-body relative z-10">
                    «{t.text}»
                  </p>
                  <div className="mt-6 pt-6 border-t border-gold-pale">
                    <div className="font-display text-base text-cream">{t.name}</div>
                    <div className="text-cream-muted text-xs font-body mt-1">{t.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-24 lg:py-32 bg-navy-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label">Инвестиции</span>
              <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line-center">
                Калькулятор стоимости
              </h2>
              <p className="text-cream-muted mt-8 max-w-xl mx-auto font-body text-sm leading-relaxed">
                Выберите пакет и количество сессий — получите предварительный расчёт. Финальная стоимость обсуждается на первой встрече.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {packages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePackage(p.id)}
                  className={`text-left p-6 border transition-all duration-300 relative ${
                    activePackage === p.id
                      ? "border-gold bg-navy-mid"
                      : "border-gold-pale bg-navy hover:border-gold hover:bg-navy-mid"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-gold text-navy text-xs font-body font-semibold px-3 py-1 tracking-wider uppercase">
                        Популярный
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-display text-2xl text-cream">{p.name}</div>
                      <div className="text-cream-muted text-xs font-body mt-1">{p.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activePackage === p.id ? "border-gold" : "border-cream-muted"}`}>
                      {activePackage === p.id && <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>}
                    </div>
                  </div>
                  <div className="font-display text-3xl text-gold mb-4">
                    от {p.basePrice.toLocaleString("ru-RU")} ₽
                  </div>
                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-cream-muted font-body">
                        <Icon name="Check" size={12} className="text-gold mt-0.5 shrink-0" fallback="Check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="luxury-card p-8 lg:p-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cream-muted text-sm font-body">Дополнительные сессии</span>
                  <span className="font-display text-2xl text-gold">{sessions}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={sessions}
                  onChange={(e) => setSessions(Number(e.target.value))}
                  className="w-full mb-8"
                  style={{ accentColor: 'var(--gold)' }}
                />

                <div className="border-t border-gold-pale pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                  <div>
                    <div className="text-cream-muted text-xs font-body uppercase tracking-widest mb-1">Итоговая стоимость</div>
                    <div className="font-display text-4xl lg:text-5xl text-gold">
                      {totalPrice.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="text-cream-muted text-xs font-body mt-2">
                      Пакет «{pkg.name}» · {sessions} {sessions === 1 ? "сессия" : sessions < 5 ? "сессии" : "сессий"}
                    </div>
                  </div>
                  <a href="#contact" className="btn-gold whitespace-nowrap">
                    Обсудить проект
                  </a>
                </div>

                <p className="text-cream-muted text-xs font-body mt-6 leading-relaxed opacity-70">
                  * Цены носят ориентировочный характер. Точная стоимость определяется после бесплатного 30-минутного разбора вашей ситуации.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="section-label">Публикации</span>
                <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line">Блог</h2>
              </div>
              <a href="#blog" className="hidden md:block btn-outline-gold text-xs">
                Все статьи
              </a>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={i}>
                <div className="luxury-card overflow-hidden cursor-pointer group">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-gold text-xs font-body font-medium uppercase tracking-wider">{post.category}</span>
                      <div className="w-px h-3 bg-gold-pale"></div>
                      <span className="text-cream-muted text-xs font-body">{post.date}</span>
                    </div>
                    <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-cream-muted text-sm font-body leading-relaxed">{post.excerpt}</p>
                    <div className="mt-6 flex items-center gap-2 text-gold text-xs font-body uppercase tracking-wider">
                      <span>Читать</span>
                      <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" fallback="ArrowRight" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 lg:py-32 bg-navy-light">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label">Начать работу</span>
              <h2 className="font-display text-4xl lg:text-5xl text-cream mt-4 gold-line-center">
                Свяжитесь со мной
              </h2>
              <p className="text-cream-muted mt-8 max-w-lg mx-auto font-body text-sm leading-relaxed">
                Расскажите о своей ситуации — проведу бесплатную 30-минутную сессию диагностики и покажу, где вы теряете выручку прямо сейчас.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="luxury-card p-8 lg:p-12 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-body text-cream-muted uppercase tracking-wider mb-2">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full bg-navy border border-gold-pale text-cream font-body text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-cream-muted placeholder:opacity-40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-cream-muted uppercase tracking-wider mb-2">Телефон / Email</label>
                  <input
                    type="text"
                    placeholder="+7 999 000 00 00"
                    className="w-full bg-navy border border-gold-pale text-cream font-body text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-cream-muted placeholder:opacity-40"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-body text-cream-muted uppercase tracking-wider mb-2">Компания и сфера</label>
                <input
                  type="text"
                  placeholder="ООО «Ромашка», производство"
                  className="w-full bg-navy border border-gold-pale text-cream font-body text-sm px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-cream-muted placeholder:opacity-40"
                />
              </div>
              <div className="mb-8">
                <label className="block text-xs font-body text-cream-muted uppercase tracking-wider mb-2">Ваш запрос</label>
                <textarea
                  rows={4}
                  placeholder="Опишите текущую ситуацию: что работает, что нет, цель на ближайшие 6 месяцев"
                  className="w-full bg-navy border border-gold-pale text-cream font-body text-sm px-4 py-3 outline-none focus:border-gold transition-colors resize-none placeholder:text-cream-muted placeholder:opacity-40"
                />
              </div>
              <button className="btn-gold w-full text-sm py-4">
                Отправить заявку на диагностику
              </button>
              <p className="text-cream-muted text-xs font-body text-center mt-4 opacity-60">
                Отвечаю в течение 4 рабочих часов. Конфиденциально.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy border-t border-gold-pale py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex flex-col gap-1 justify-center">
              <div className="w-full h-px bg-gold"></div>
              <div className="w-3/4 h-px bg-gold opacity-60"></div>
            </div>
            <span className="font-display text-lg text-cream">Алексей Громов</span>
          </div>
          <div className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-xs">{l.label}</a>
            ))}
          </div>
          <div className="text-cream-muted text-xs font-body opacity-50">
            © 2026 Все права защищены
          </div>
        </div>
      </footer>

    </div>
  );
}
