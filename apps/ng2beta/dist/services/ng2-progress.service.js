System.register(['angular2/angular2', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1, http_1;
    var Ng2Progress;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Ng2Progress = (function () {
                function Ng2Progress(http) {
                    var _this = this;
                    this.http = http;
                    this.evaluationRange = 7;
                    this.http.get('./data.json')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        _this.data = res;
                        var progressData = _this.data.milestonedata;
                        var daysRemaining = _this.calculateDaysRemaining(progressData);
                        _this.projectedDate = moment().add(daysRemaining, 'days');
                        var startIdx = _this.data.milestonedata.length - _this.evaluationRange;
                        var newOpenSum = 0;
                        var newClosedSum = 0;
                        for (var i = startIdx; i < _this.data.milestonedata.length; i++) {
                            newOpenSum += _this.data.milestonedata[i].newOpen;
                            newClosedSum += _this.data.milestonedata[i].newClosed;
                        }
                        _this.newOpenAvg = Math.round((newOpenSum / (_this.data.milestonedata.length - startIdx)));
                        _this.newClosedAvg = Math.round((newClosedSum / (_this.data.milestonedata.length - startIdx)));
                        // $('#releasedate').html(projectedDate.format('dddd, MMMM Do YYYY'));
                        // $('#currentPace').html(currentPace + '%');
                        // $('#resolvedIssuesPercent').html(progressData[progressData.length - 1].percent + '%');
                        // $('#openIssues').html(progressData[progressData.length - 1].open);
                    });
                }
                Ng2Progress.prototype.generateChart = function (el, chartDataSet) {
                    new Chart(el.nativeElement.getContext("2d")).Line(chartDataSet, {
                        responsive: true,
                        bezierCurve: false,
                        bezierCurveTension: 0.2,
                        // maintainAspectRatio: true,
                        scaleBeginAtZero: true,
                        scaleFontColor: "#fff",
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
                    });
                };
                Ng2Progress.prototype.calculateAverageCurrentPace = function (progressData) {
                    var paces = [];
                    var paceTotal = 0;
                    var avgPace = 0;
                    var startIdx = this.data.milestonedata.length - this.evaluationRange;
                    for (var i = startIdx + 1; i <= progressData.length - 1; i++) {
                        var day1 = moment(progressData[i - 1].date);
                        var day2 = moment(progressData[i].date);
                        var daysDifference = moment.duration(day2.diff(day1)).get('days');
                        var percentage = (progressData[i].percent - progressData[i - 1].percent) / daysDifference;
                        paces.push(Math.round(percentage));
                        paceTotal += Math.round(percentage);
                    }
                    avgPace = paceTotal / paces.length;
                    return Math.round(avgPace);
                };
                Ng2Progress.prototype.calculateDaysRemaining = function (progressData) {
                    var percentageMissing = 100 - progressData[progressData.length - 1].percent;
                    var avgPacePerDay = this.calculateAverageCurrentPace(progressData);
                    return Math.round(percentageMissing / avgPacePerDay);
                };
                Ng2Progress = __decorate([
                    angular2_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], Ng2Progress);
                return Ng2Progress;
                var _a;
            })();
            exports_1("Ng2Progress", Ng2Progress);
        }
    }
});
