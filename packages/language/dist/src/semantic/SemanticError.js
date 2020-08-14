var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SemanticError = /** @class */ (function (_super) {
    __extends(SemanticError, _super);
    function SemanticError(message, fragment) {
        var _this = _super.call(this, message) || this;
        _this.kind = 'error';
        _this.name = 'SemanticError';
        _this.message = message;
        _this.fragment = fragment;
        _this.range = fragment.range;
        _this.stack = message + " at line: " + fragment.range.start.line + ", column: " + fragment.range.start.column;
        return _this;
    }
    return SemanticError;
}(Error));
export { SemanticError };
