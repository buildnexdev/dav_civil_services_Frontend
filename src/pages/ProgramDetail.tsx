import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import programsData from '../data/programsData';
import type { Program } from '../data/programsData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ZOHO_APPLY_URL } from '../constants/links';
import './ProgramDetail.css';

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const program: Program | undefined = programsData.find((p) => p.slug === slug);

  /* scroll-reveal refs for each section */
  const [overviewRef, overviewVis] = useScrollReveal();
  const [whyRef, whyVis] = useScrollReveal();
  const [examRef, examVis] = useScrollReveal();
  const [prepRef, prepVis] = useScrollReveal();
  const [courseRef, courseVis] = useScrollReveal();
  const [methodRef, methodVis] = useScrollReveal();
  const [resRef, resVis] = useScrollReveal();
  const [testRef, testVis] = useScrollReveal();
  const [admRef, admVis] = useScrollReveal();
  const [faqRef, faqVis] = useScrollReveal();
  const [ctaRef, ctaVis] = useScrollReveal();

  useEffect(() => {
    if (program) {
      document.title = `${program.name} Residential Coaching | DAV Civil Services`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', program.shortDescription);
      }
    }
    window.scrollTo(0, 0);
  }, [program]);

  if (!program) {
    return (
      <div className="pd-not-found">
        <div className="container text-center">
          <h1>Programme Not Found</h1>
          <p>The programme you are looking for does not exist.</p>
          <Link to="/programs" className="btn btn-primary">
            View All Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="program-detail-page">

      {/* ─── 2. Programme Overview ────────────────────── */}
      <section className="section-padding" id="programme-overview" ref={overviewRef}>
        <div className={`container pd-section sr ${overviewVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title">Programme Overview</h2>
          <div className="pd-overview-card card">
            <p>{program.overview}</p>
          </div>
        </div>
      </section>

      {/* ─── 3. Why Choose ────────────────────────────── */}
      <section className="section-padding bg-soft" ref={whyRef}>
        <div className={`container pd-section sr-stagger ${whyVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Why Choose This Programme</h2>
          <div className="pd-features-grid">
            {program.whyChoose.map((f, i) => (
              <div className="pd-feature-card sr-child" key={i}>
                <span className="pd-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Examination Structure ─────────────────── */}
      <section className="section-padding" ref={examRef}>
        <div className={`container pd-section sr-stagger ${examVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Examination Structure</h2>
          <div className="pd-exam-timeline">
            {program.examStructure.map((stage, i) => (
              <div className="pd-exam-stage sr-child" key={i}>
                <div className="pd-exam-number">{i + 1}</div>
                <div className="pd-exam-info">
                  <h3>{stage.stage}</h3>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Preparation Areas / Syllabus ──────────── */}
      <section className="section-padding bg-soft" ref={prepRef}>
        <div className={`container pd-section sr ${prepVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title">Preparation Areas</h2>
          <div className="pd-prep-tags">
            {program.preparationAreas.map((area) => (
              <span className="pd-prep-tag" key={area}>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Course Structure ──────────────────────── */}
      <section className="section-padding" ref={courseRef}>
        <div className={`container pd-section sr-stagger ${courseVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Course Structure</h2>
          <div className="pd-course-phases">
            {program.courseStructure.map((phase, i) => (
              <div className="pd-phase-card sr-child" key={i}>
                <div className="pd-phase-badge">{phase.phase}</div>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Teaching Methodology ──────────────────── */}
      <section className="section-padding bg-soft" ref={methodRef}>
        <div className={`container pd-section sr ${methodVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title">Teaching Methodology</h2>
          <div className="pd-methodology-card card">
            <ul className="pd-methodology-list">
              {program.teachingMethodology.map((item, i) => (
                <li key={i}>
                  <span className="pd-method-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 8. Residential Experience ────────────────── */}
      <section className="section-padding" ref={resRef}>
        <div className={`container pd-section sr-stagger ${resVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Residential Experience</h2>
          <p className="pd-section-subtitle sr-child">
            Learning extends beyond the classroom. Our residential environment provides aspirants with a disciplined
            academic routine, guided study hours, peer learning, regular assessments and continuous mentorship.
          </p>
          <div className="pd-residential-grid">
            {program.residentialFeatures.map((f, i) => (
              <div className="pd-res-card sr-child" key={i}>
                <span className="pd-res-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Test & Assessment ─────────────────────── */}
      <section className="section-padding bg-soft" ref={testRef}>
        <div className={`container pd-section sr-stagger ${testVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Test &amp; Assessment</h2>
          <div className="pd-test-grid">
            {[
              { icon: '📝', title: 'Regular Tests', desc: 'Weekly sectional and full-length mock tests conducted under real examination conditions.' },
              { icon: '📊', title: 'Performance Analysis', desc: 'Detailed score analysis, ranking and identification of improvement areas after each test.' },
              { icon: '🎯', title: 'Individual Feedback', desc: 'Personalised feedback from mentors with specific guidance on answer improvement.' },
            ].map((item, i) => (
              <div className="pd-test-card sr-child" key={i}>
                <span className="pd-test-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. Admission Process ────────────────────── */}
      <section className="section-padding" ref={admRef}>
        <div className={`container pd-section sr ${admVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title">Admission Process</h2>
          <div className="pd-admission-steps">
            {program.admissionSteps.map((step, i) => (
              <div className="pd-admission-step" key={i}>
                <div className="pd-step-number">{i + 1}</div>
                <div className="pd-step-label">{step}</div>
                {i < program.admissionSteps.length - 1 && (
                  <div className="pd-step-connector" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. FAQs ────────────────────────────────── */}
      <section className="section-padding bg-soft" ref={faqRef}>
        <div className={`container pd-section sr ${faqVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="pd-faq-list">
            {program.faqs.map((faq, i) => (
              <div
                className={`pd-faq-item ${openFaq === i ? 'pd-faq-open' : ''}`}
                key={i}
              >
                <button
                  className="pd-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.question}</span>
                  <span className="pd-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="pd-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. Apply Now CTA ────────────────────────── */}
      <section className="pd-apply-cta" ref={ctaRef}>
        <div className="pd-apply-cta-glow" aria-hidden="true" />
        <div className={`container text-center sr-scale ${ctaVis ? 'sr-visible' : ''}`}>
          <h2>Begin Your {program.name} Preparation</h2>
          <p>
            Take the next step towards your goal. Apply now to join the residential programme or contact our
            admissions team for personalised guidance.
          </p>
          <div className="pd-cta-actions">
            <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
              Apply Now
            </a>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
