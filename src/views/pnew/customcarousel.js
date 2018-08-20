import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types'

class CustomCarousel extends Component {
  static defaultProps = {
    banner: []
  };
  static propTypes = {
    banner: PropTypes.array.isRequired
  };
  render() {
    let {banner} = this.props;
    return (
      <Carousel
          autoplay={true}
          infinite
        >
          {
            banner.map(val => (
            <a
              key={val.id}
              href={val.extra.tourl}
              target="_blank"
              style={{ display: 'inline-block', width: '100vw', height: 'auto' }}
            >
              <img
                src={val.imgurl}
                alt={val.intro}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
      </Carousel>
    );
  }
}

export default CustomCarousel;


