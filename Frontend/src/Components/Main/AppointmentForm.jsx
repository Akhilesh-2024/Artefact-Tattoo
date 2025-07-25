import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const sectionRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: new Date(),
    time: "",
    service: "",
    artist: "",
  });
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState("");

  // Options for react-select
  const timeOptions = [
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "02:00 PM", label: "02:00 PM" },
    { value: "04:00 PM", label: "04:00 PM" },
    { value: "06:00 PM", label: "06:00 PM" },
    { value: "08:00 PM", label: "08:00 PM" },
  ];

  const serviceOptions = [
    { value: "Tattoo Design", label: "Tattoo Design" },
    { value: "Piercing", label: "Piercing" },
    { value: "Laser Removal", label: "Laser Removal" },
  ];

  const artistOptions = [
    { value: "Andreas", label: "Andreas" },
    { value: "Daniel", label: "Daniel" },
    { value: "Jason", label: "Jason" },
  ];

  // Custom styles for react-select
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#101010',
      border: `1px solid ${state.isFocused ? '#904d30' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: 0,
      minHeight: '48px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(144, 77, 48, 0.2)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#904d30' : 'rgba(255, 255, 255, 0.1)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#999',
      fontSize: '15px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#666',
      fontSize: '15px',
    }),
    menu: (provided) => ({
      ...provided,
      background: '#222',
      border: 'none',
      borderRadius: 0,
      zIndex: 100,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#904d30' : state.isFocused ? '#904d30' : '#222',
      color: state.isSelected || state.isFocused ? '#fff' : '#999',
      padding: '10px 30px',
      fontSize: '15px',
      borderTop: '1px solid rgba(255, 255, 255, 0.03)',
      textAlign: 'center',
      '&:first-child': {
        borderTop: 'none',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#999',
      '&:hover': {
        color: '#999',
      },
    }),
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/appointment-content`);
        setContent(res.data);
      } catch (error) {
        console.error("Failed to fetch appointment content", error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (sectionRef.current && content) {
      const serverUrl = import.meta.env.VITE_API_URL;
      const bgUrl = content.backgroundImage
        ? `${serverUrl}${content.backgroundImage}`
        : "/img/slider/2.jpg";
      sectionRef.current.style.backgroundImage = `url(${bgUrl})`;
    }
  }, [content]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.service.trim()) newErrors.service = "Service is required";
    if (!formData.artist.trim()) newErrors.artist = "Artist is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption?.value || "" }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      setMessage("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        date: formData.date.toISOString(),
      };

      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/api/tatto/appointment-booking`, payload);
      setMessage("Appointment booked successfully!");
      setFormData({
        name: "",
        phone: "",
        date: new Date(),
        time: "",
        service: "",
        artist: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Appointment booking failed:", err);
      setMessage(err.response?.data?.error || "Failed to book appointment");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="appointment" id="appointment">
      <div ref={sectionRef} className="background bg-img bg-fixed section-padding" data-overlay-dark={3}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 section-head">
              <div className="section-subtitle">{content?.subtitle || "Book Your Tattoo"}</div>
              <div className="section-title white" style={{ color: "white" }}>
                {content?.title || "Appointment"}
              </div>
              <p>{content?.description}</p>
              <div className="reservations mb-30">
                <div className="icon">
                  <img src="/img/call.png" alt="call" />
                </div>
                <div className="text">
                  <p>Appointment</p>
                  <a href={`tel:${content?.phoneNumber}`}>{content?.phoneNumber}</a>
                </div>
              </div>
              {message && (
                <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"} mt-3`}>
                  {message}
                </div>
              )}
            </div>

            <div className="col-md-6 offset-md-1">
              <div className="booking-box">
                <div className="booking-inner clearfix">
                  <form className="form1 clearfix" onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Name */}
                      <div className="col-md-6 mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Name"
                        />
                        {errors.name && <div className="text-danger small">{errors.name}</div>}
                      </div>

                      {/* Phone */}
                      <div className="col-md-6 mb-3">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone"
                        />
                        {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                      </div>

                      {/* Date */}
                      <div className="col-md-6 mb-3">
                        <label>Date</label>
                        <DatePicker
                          selected={formData.date}
                          onChange={handleDateChange}
                          className="form-control"
                          dateFormat="yyyy-MM-dd"
                          minDate={new Date()}
                          maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                        />
                      </div>

                      {/* Time */}
                      <div className="col-md-6 mb-3">
                        <label>Time</label>
                        <Select
                          name="time"
                          options={timeOptions}
                          styles={selectStyles}
                          placeholder="Select time"
                          value={timeOptions.find(option => option.value === formData.time)}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'time' })}
                          isSearchable={false}
                        />
                        {errors.time && <div className="text-danger small">{errors.time}</div>}
                      </div>

                      {/* Service */}
                      <div className="col-md-6 mb-3">
                        <label>Services</label>
                        <Select
                          name="service"
                          options={serviceOptions}
                          styles={selectStyles}
                          placeholder="Select service"
                          value={serviceOptions.find(option => option.value === formData.service)}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'service' })}
                          isSearchable={false}
                        />
                        {errors.service && <div className="text-danger small">{errors.service}</div>}
                      </div>

                      {/* Artist */}
                      <div className="col-md-6 mb-3">
                        <label>Choose Artist</label>
                        <Select
                          name="artist"
                          options={artistOptions}
                          styles={selectStyles}
                          placeholder="Select artist"
                          value={artistOptions.find(option => option.value === formData.artist)}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'artist' })}
                          isSearchable={false}
                        />
                        {errors.artist && <div className="text-danger small">{errors.artist}</div>}
                      </div>

                      {/* Submit */}
                      <div className="col-md-12">
                        <button type="submit" className="btn-form1-submit mt-3" disabled={saving}>
                          {saving ? "Booking..." : "Book Your Tattoo"}
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