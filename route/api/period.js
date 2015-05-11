/*
 * API
 * Year and Month in limits
 */

exports.years = function(req, res) {
  var range_year = [
    {value: '2012', name:'2012'},
    {value: '2013', name:'2013'},
    {value: '2014', name:'2014'},
    {value: '2015', name:'2015'},
    {value: '2016', name:'2016'}
  ];

  res.json(range_year);
};


exports.months = function(req, res) {
  var range_month = [
    {value: '01', name:'1'},
    {value: '02', name:'2'},
    {value: '03', name:'3'},
    {value: '04', name:'4'},
    {value: '05', name:'5'},
    {value: '06', name:'6'},
    {value: '07', name:'7'},
    {value: '08', name:'8'},
    {value: '09', name:'9'},
    {value: '10', name:'10'},
    {value: '11', name:'11'},
    {value: '12', name:'12'}
  ];

  res.json(range_month);
};
