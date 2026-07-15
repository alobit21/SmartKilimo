"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvisoryStatus = exports.DealStatus = exports.RequestStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["FARMER"] = "FARMER";
    Role["BUYER"] = "BUYER";
    Role["OFFICER"] = "OFFICER";
})(Role || (exports.Role = Role = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "PENDING";
    RequestStatus["ACCEPTED"] = "ACCEPTED";
    RequestStatus["REJECTED"] = "REJECTED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
// Re-using RequestStatus for both Deals and Advisory Requests as they have the same states.
exports.DealStatus = RequestStatus;
exports.AdvisoryStatus = RequestStatus;
