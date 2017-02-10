"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var project_1 = require('./project');
var projects_service_1 = require('./projects.service');
var ProjectSummaryComponent = (function () {
    function ProjectSummaryComponent(service) {
        this.service = service;
    }
    ProjectSummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getUsers().subscribe(function (users) {
            _this.avatars = users
                .filter(function (u) { return _this.project.users.indexOf(u.username) > -1; })
                .map(function (u) { return u.avatar; });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', project_1.Project)
    ], ProjectSummaryComponent.prototype, "project", void 0);
    ProjectSummaryComponent = __decorate([
        core_1.Component({
            selector: 'project-summary',
            templateUrl: 'app/templates/projectSummary.component.html',
            providers: [projects_service_1.ProjectsService]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService])
    ], ProjectSummaryComponent);
    return ProjectSummaryComponent;
}());
exports.ProjectSummaryComponent = ProjectSummaryComponent;
//# sourceMappingURL=projectSummary.component.js.map