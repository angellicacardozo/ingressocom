/**
** highlights.service.js
**
** @description Servico responsável por retornar os highlights 
**				fornecidos pelo endpoint da Ingresso
** @note		All Angular services are singletons. 
**				This means that there is only one instance of a given service per injector.
** @filters		cinema, bairro, genero
**
**/
(function() {
'use strict';

angular
	.module('app.highlights')
	.service('HighlightsService', ['$http', '$q', 'apiUrl', _HighlightsService]);

	function _HighlightsService($http, $q, apiUrl) {

		this.queryAll = _queryAll;

		///

		/**
		** @attr cityId Integer
		** @attr genre String
		** @attr showtimeId String
		**/
		function _queryAll(cityId, genre, showtimeId) {
			var defer = $q.defer();

			$http.get('data/data.json')
	            .success(function(data) {

	            	data = _filterByGenre(data, genre);
	            	data = _filterByShowtimeId(data, showtimeId);

	                defer.resolve(data);
	            })
	            .error(function() {
	                defer.reject('could not find the service');
	            });

	        return defer.promise;
		}

		function _filterByGenre(data, genre) {
			var i,j;
			var results=[];
			var match = false;

			if(Object.prototype.toString.call(genre) !== "[object String]") {
				return data;
			}

			if(Object.prototype.toString.call(genre) === "[object String]"
				&& genre.length===0) {
				return data;
			}

			for(i=0;i<data.length;i++) {

				j= 0;
				match = false;
				while(!match) {

					if(j===data[i].event.genres.length) {
						match = true;
					} else if(String.prototype.toLowerCase.call(data[i].event.genres[j])===String.prototype.toLowerCase.call(genre)) {
						match = true;
						results.push(angular.copy(data[i]));
					}

					j++;
				}
			}

			return results;
		}

		function _filterByShowtimeId(data, id) {
			var i,j;
			var results=[];
			var match = false;

			if(Object.prototype.toString.call(id) !== "[object String]") {
				return data;
			}

			if(Object.prototype.toString.call(id) === "[object String]"
				&& id.length===0) {
				return data;
			}

			for(i=0;i<data.length;i++) {

				j= 0;
				match = false;
				while(!match) {

					if(j===data[i].showtimes.length) {
						match = true;
					} else if (data[i].showtimes[j].id===id) {
						match = true;
						results.push(angular.copy(data[i]));
					}

					j++;
				}
			}

			return results;
		}
	}
})();