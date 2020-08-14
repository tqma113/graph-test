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
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, token) {
        var _this = _super.call(this, message) || this;
        _this.kind = 'error';
        _this.name = 'SyntaxError';
        _this.message = message;
        _this.token = token;
        _this.stack = message + " at line: " + token.range.start.line + ", column: " + token.range.start.column;
        return _this;
    }
    return SyntaxError;
}(Error));
export { SyntaxError };
