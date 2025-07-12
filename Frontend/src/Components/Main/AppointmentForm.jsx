
const AppointmentForm = () => {
  return (
    <section className="appointment">
      <div
        className="background bg-img bg-fixed section-padding"
        data-background="img/slider/2.jpg"
        data-overlay-dark={3}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 section-head">
              <div className="section-subtitle">Book Your Tattoo</div>
              <div className="section-title white">Appointment</div>
              <p>
                Tattoo viverra tristique usto duis vitae diam neque nivamus
                aestan atene artine arinianu ateli finibus viverra nec lacus.
                nedana duru edino setlie fermen.
              </p>
              <div className="reservations mb-30">
                <div className="icon">
                  <img src="img/call.png" alt="" />
                </div>
                <div className="text">
                  <p>Appointment</p>
                  <a href="tel:855-100-4444">855 100 4444</a>
                </div>
              </div>
            </div>
            {/* Appointment form */}
            <div className="col-md-6 offset-md-1">
              <div className="booking-box">
                <div className="booking-inner clearfix">
                  <form className="form1 clearfix">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input1_wrapper">
                          <label>Name</label>
                          <div className="input2_inner">
                            <input
                              type="text"
                              className="form-control input"
                              placeholder="Name"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input1_wrapper">
                          <label>Phone</label>
                          <div className="input2_inner">
                            <input
                              type="text"
                              className="form-control input"
                              placeholder="Phone"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input1_wrapper">
                          <label>Date</label>
                          <div className="input1_inner">
                            <input
                              type="text"
                              className="form-control input datepicker"
                              placeholder="Date"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="select1_wrapper">
                          <label>Time</label>
                          <div className="select1_inner">
                            <select
                              className="select2 select"
                              style={{ width: "100%" }}
                            >
                              <option value={0}>Time</option>
                              <option value={1}>10:00 am</option>
                              <option value={2}>11:00 am</option>
                              <option value={3}>12:00 pm</option>
                              <option value={4}>14:00 pm</option>
                              <option value={5}>16:00 pm</option>
                              <option value={6}>18:00 pm</option>
                              <option value={7}>20:00 pm</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="select1_wrapper">
                          <label>Services</label>
                          <div className="select1_inner">
                            <select
                              className="select2 select"
                              style={{ width: "100%" }}
                            >
                              <option value={0}>Services</option>
                              <option value={1}>Tattooing</option>
                              <option value={2}>Piercing</option>
                              <option value={3}>Laser Removal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="select1_wrapper">
                          <label>Choose Artist</label>
                          <div className="select1_inner">
                            <select
                              className="select2 select"
                              style={{ width: "100%" }}
                            >
                              <option value={0}>Choose Artist</option>
                              <option value={1}>Andreas</option>
                              <option value={2}>Daniel</option>
                              <option value={3}>Jason</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn-form1-submit mt-15"
                        >
                          Book Your Tattoo
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
