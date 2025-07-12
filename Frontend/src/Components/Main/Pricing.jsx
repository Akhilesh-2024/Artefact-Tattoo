
const Pricing = () => {
  return (
    <section className="price-banner menu-book bg-blck">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 p-0">
            <div className="img left">
              <img src="img/price.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-7 p-0 valign">
            <div className="content">
              <div className="section-head mb-30">
                <div className="section-subtitle">Pricing Plan</div>
                <div className="section-title white">Price List</div>
              </div>
              <div className="menu-list">
                <div className="item">
                  <div className="flex">
                    <div className="title">Tattooing</div>
                    <div className="price">$60</div>
                  </div>
                  <div className="dots" />
                </div>
              </div>
              <div className="menu-list">
                <div className="item">
                  <div className="flex">
                    <div className="title">Tattoo Cover Up</div>
                    <div className="price">$45</div>
                  </div>
                  <div className="dots" />
                </div>
              </div>
              <div className="menu-list">
                <div className="item">
                  <div className="flex">
                    <div className="title">Piercing</div>
                    <div className="price">$30</div>
                  </div>
                  <div className="dots" />
                </div>
              </div>
              <div className="menu-list">
                <div className="item">
                  <div className="flex">
                    <div className="title">Laser Removal</div>
                    <div className="price">$75</div>
                  </div>
                  <div className="dots" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
