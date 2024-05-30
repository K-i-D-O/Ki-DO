const apiMonitor = (response) => {
  process.env.NODE_ENV === 'development' && response.ok
    ? console.log(
        '%c API_RESPONSE! %c' + response.config.url,
        'background: #222; color: #bada55; font-size:16px',
        'background:red;color:white;'
      )
    : console.log(
        '%c API_RESPONSE! %c' + response.config.url,
        'background: #222; color: #ff7788; font-size:16px',
        'background:red;color:white;'
      );
};

export default apiMonitor;
