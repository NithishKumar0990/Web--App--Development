// Footer Component
const Footer = () => (
  <footer className="border-t border-slate-100 bg-white pt-24 pb-12 px-6">
    <div className="max-w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 ">
        <div>
          <div className="flex items-center gap-3 text-slate-600 mb-8  ">
            <BookOpen size={20} className="text-blue-600" />
            <h3 className="font-bold tracking-tight text-lg ">Publication</h3>
          </div>
          <a
            href="https://matjournals.net/engineering/index.php/JoCNSDC/article/view/361"
            target="_blank"
            className=" group block p-8 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 "
          >
            <p className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 ">
              Journal of Cryptography and Network Security (2024)
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Globe size={14} />
              matjournals.net/engineering/JoCNSDC/361
              <ExternalLink
                size={14}
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </a>
        </div>

        <div>
          <div className="flex items-center gap-3 text-slate-900 mb-8">
            <Globe size={20} className="text-blue-600" />
            <h3 className="font-bold tracking-tight text-lg">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { lang: "English", level: "Fluent" },
              { lang: "Tamil", level: "Native" },
              { lang: "Kannada", level: "Conversational" },
            ].map((l, i) => (
              <div
                key={i}
                className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <p className="text-base font-bold text-slate-900 leading-none mb-2">
                  {l.lang}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                  {l.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900">
            Nithish Kumar L
          </span>
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} AI & Data Science Specialist
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <a
            href="tel:+916382417367"
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium"
          >
            <Phone size={14} /> +91 6382417367
          </a>
          <a
            href="mailto:nithishkumarl168@gmail.com"
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium"
          >
            <Mail size={14} /> nithishkumarl168@gmail.com
          </a>

          <a
            href="https://github.com/Nithishkumar0990"
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium"
          >
            <GitHubIcon size={14} /> GitHub
          </a>
          <a
            href="/images/resume.pdf" // 👈 EXACT path for your location
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium"
          >
            <ExternalLink size={14} />
            View Resume
          </a>
        </div>
      </div>
    </div>
  </footer>
);
