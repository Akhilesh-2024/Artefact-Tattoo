import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  
  const [email, setEmail] = useState('');
  
  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    // Here you would typically send the email to a server
    alert('Thank you for subscribing!');
    setEmail('');
  };
  
  // Countdown timer
  useEffect(() => {
    const countdown = () => {
      const now = new Date();
      const eventDate = new Date(2025, 11, 6); // December 6, 2025
      const currentTime = now.getTime();
      const eventTime = eventDate.getTime();
      const remTime = eventTime - currentTime;
      
      let s = Math.floor(remTime / 1000);
      let m = Math.floor(s / 60);
      let h = Math.floor(m / 60);
      let d = Math.floor(h / 24);
      
      h %= 24;
      m %= 60;
      s %= 60;
      
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      
      setTimeLeft({
        days: d.toString(),
        hours: h.toString(),
        minutes: m.toString(),
        seconds: s.toString()
      });
    };
    
    // Initial call
    countdown();
    
    // Set up interval
    const timerId = setInterval(countdown, 1000);
    
    // Clean up
    return () => clearInterval(timerId);
  }, []);
  
  return (
    <div className="comming section-padding">
      <div className="v-middle">
        <div className="container">
          <div className="row text-center mb-20">
            <div className="col-md-12">
              <h1>Coming Soon!</h1>
              <p>Our website is under construction!</p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-6 offset-md-2 col-md-2">
              <div className="item">
                <div className="down">
                  <h3 id="days">{timeLeft.days}</h3>
                </div>
                <div className="item-info">
                  <h6>Days</h6>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="item">
                <div className="down">
                  <h3 id="hours">{timeLeft.hours}</h3>
                </div>
                <div className="item-info">
                  <h6>Hours</h6>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="item">
                <div className="down">
                  <h3 id="minutes">{timeLeft.minutes}</h3>
                </div>
                <div className="item-info">
                  <h6>Minutes</h6>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="item">
                <div className="down">
                  <h3 id="seconds">{timeLeft.seconds}</h3>
                </div>
                <div className="item-info">
                  <h6>Seconds</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="offset-md-3 col-md-6">
              <p>Sign up for our latest news & articles.</p>
              <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="row text-center">
            <div className="go-back col-md-12">
              <Link to="/">
                <span><i className="ti-arrow-left" aria-hidden="true"></i></span>&nbsp; Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;