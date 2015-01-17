'use strict';

angular.module('core').factory('Core', [
	function() {
		return {
			findIndexByKeyValue: function(obj, key, value) {
	      for (var i = 0; i < obj.length; i++) {
	        if (obj[i][key] === value) {
	          return i;
	        }
	      }
	      return -1;
			},
			abbrState: function(input) {
	      var states = [
	        ['Arizona', 'AZ'],
	        ['Alabama', 'AL'],
	        ['Alaska', 'AK'],
	        ['Arizona', 'AZ'],
	        ['Arkansas', 'AR'],
	        ['California', 'CA'],
	        ['Colorado', 'CO'],
	        ['Connecticut', 'CT'],
	        ['Delaware', 'DE'],
	        ['Florida', 'FL'],
	        ['Georgia', 'GA'],
	        ['Hawaii', 'HI'],
	        ['Idaho', 'ID'],
	        ['Illinois', 'IL'],
	        ['Indiana', 'IN'],
	        ['Iowa', 'IA'],
	        ['Kansas', 'KS'],
	        ['Kentucky', 'KY'],
	        ['Kentucky', 'KY'],
	        ['Louisiana', 'LA'],
	        ['Maine', 'ME'],
	        ['Maryland', 'MD'],
	        ['Massachusetts', 'MA'],
	        ['Michigan', 'MI'],
	        ['Minnesota', 'MN'],
	        ['Mississippi', 'MS'],
	        ['Missouri', 'MO'],
	        ['Montana', 'MT'],
	        ['Nebraska', 'NE'],
	        ['Nevada', 'NV'],
	        ['New Hampshire', 'NH'],
	        ['New Jersey', 'NJ'],
	        ['New Mexico', 'NM'],
	        ['New York', 'NY'],
	        ['North Carolina', 'NC'],
	        ['North Dakota', 'ND'],
	        ['Ohio', 'OH'],
	        ['Oklahoma', 'OK'],
	        ['Oregon', 'OR'],
	        ['Pennsylvania', 'PA'],
	        ['Rhode Island', 'RI'],
	        ['South Carolina', 'SC'],
	        ['South Dakota', 'SD'],
	        ['Tennessee', 'TN'],
	        ['Texas', 'TX'],
	        ['Utah', 'UT'],
	        ['Vermont', 'VT'],
	        ['Virginia', 'VA'],
	        ['Washington', 'WA'],
	        ['West Virginia', 'WV'],
	        ['Wisconsin', 'WI'],
	        ['Wyoming', 'WY'],
	      ];
	   
	      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	      for (var i = 0; i < states.length; i++){
	        if (states[i][0] === input){
	          return (states[i][1]);
	        }
	      }    
			}
		};
	}
]);