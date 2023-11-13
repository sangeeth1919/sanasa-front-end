app.directive('barChart', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/barChart.html',
        scope: {
            series: '=',
            data: '=',
            options: '=',
            colors: '=',
            labels: '='
        },
        link: function (scope, element, attrs) {
            
            if(!Array.isArray(scope.data)) scope.data = []
            if(!Array.isArray(scope.series)) scope.series = []
            if(!Array.isArray(scope.colors)) scope.colors = []
            if(!Array.isArray(scope.labels)) scope.labels = []

            scope.getMaxLengthArray = function () {
                let length = Math.max(...scope.data.map(a=>a.length));
                if(length == '-Infinity' || length == 'Infinity') length = 0
                return new Array(length)
            }
            
            function getRoundMaxNumber() {
                let max = Math.max(...[].concat(...scope.data).map(a => a))
                
                return Math.ceil(max / 10) * 10;
            }

            scope.getYAxis = function() {
                return Array.from({length: ((getRoundMaxNumber() + 10) / 10)}, (_, i) => i * 10).reverse()
            }
            
            scope.getColor = function (i) {
                if(Array.isArray(scope.colors)) {
                    if(scope.colors[i]) return scope.colors[i]
                }

                return '#dee5f6'
            }
            
            scope.getLabel = function (i) {
                if(Array.isArray(scope.labels)) {
                    if(scope.labels[i]) return scope.labels[i]
                }

                return i
            }
            
        }
    }
})