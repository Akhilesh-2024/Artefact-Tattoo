import { useEffect, useState } from "react";
import axios from "axios";

const Process = () => {
  const [processData, setProcessData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/process`);
        if (Array.isArray(res.data)) {
          setProcessData(res.data[0]);
        } else {
          setProcessData(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching process data:", err);
        setLoading(false);
      }
    };

    fetchProcess();
  }, []);

    useEffect(() => {
      if (processData && window.$) {
        const $ = window.$;

        // Animate elements
        $(".animate-box").each(function () {
          const $el = $(this);
          const effect = $el.data("animate-effect");
          $el.removeClass("animated fadeInLeft fadeInRight fadeInUp fadeInDown");
          setTimeout(() => {
            $el.addClass(`animated ${effect}`);
          }, 100);
        });

        // Accordion logic
        const $accordionGrp = $(".accrodion-grp");
        if ($accordionGrp.length) {
          $accordionGrp.each(function () {
            const $self = $(this);
            const accName = $self.data("grp-name");
            $self.addClass(accName);

            $self.find(".accrodion .accrodion-content").hide();
            $self.find(".accrodion.active").find(".accrodion-content").show();

            $self.find(".accrodion-title").on("click", function () {
              const $parent = $(this).parent();
              if (!$parent.hasClass("active")) {
                $(`.accrodion-grp.${accName} .accrodion`).removeClass("active");
                $(`.accrodion-grp.${accName} .accrodion-content`).slideUp();
                $parent.addClass("active");
                $parent.find(".accrodion-content").slideDown();
              }
            });
          });
        }
      }
    }, [processData]);

  if (loading || !processData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div
            className="col-md-5 section-head animate-box"
            data-animate-effect="fadeInLeft"
          >
            <div className="section-subtitle">{processData.subtitle}</div>
            <div className="section-title white">
              {processData.title.split(" ").map((word, idx) =>
                idx === processData.title.split(" ").length - 1 ? (
                  <span key={idx}>{word}</span>
                ) : (
                  word + " "
                )
              )}
            </div>
            <p>{processData.description}</p>

            <ul className="about-list list-unstyled">
              {processData.highlights?.map((highlight, idx) => (
                <li key={idx}>
                  <div className="about-list-icon">
                    <span className="ti-layout-line-solid" />
                  </div>
                  <div className="about-list-text">
                    <p>{highlight}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div
            className="col-md-6 offset-md-1 mt-30 animate-box"
            data-animate-effect="fadeInRight"
          >
            <div
              className="accrodion-grp"
              data-grp-name="process-faq-one-accrodion"
            >
              {processData.steps?.map((step, idx) => (
                <div
                  key={idx}
                  className={`accrodion ${idx === 0 ? "active" : ""} ${
                    idx === processData.steps.length - 1 ? "last-chiled" : ""
                  }`}
                >
                  <div className="accrodion-title">
                    <h4>
                      <span>{step.stepNumber}.</span> {step.title}
                    </h4>
                  </div>
                  <div className="accrodion-content">
                    <div className="inner">
                      <p>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
