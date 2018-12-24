"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Indecision = function (_React$Component) {
    _inherits(Indecision, _React$Component);

    function Indecision(props) {
        _classCallCheck(this, Indecision);

        var _this = _possibleConstructorReturn(this, (Indecision.__proto__ || Object.getPrototypeOf(Indecision)).call(this, props));

        _this.state = {
            options: []
        };

        _this.removeAll = _this.removeAll.bind(_this);
        _this.pickTodo = _this.pickTodo.bind(_this);
        _this.addOptionArr = _this.addOptionArr.bind(_this);
        _this.removeOne = _this.removeOne.bind(_this);
        return _this;
    }

    _createClass(Indecision, [{
        key: "removeAll",
        value: function removeAll() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "removeOne",
        value: function removeOne(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (eachOption) {
                        return eachOption !== optionToRemove;
                    })
                };
            });
        }
    }, {
        key: "pickTodo",
        value: function pickTodo() {
            var r = Math.floor(Math.random() * this.state.options.length);
            alert(this.state.options[r]);
        }
    }, {
        key: "addOptionArr",
        value: function addOptionArr(option) {
            if (!option) {
                return "please enter some value";
            } else if (this.state.options.indexOf(option) !== -1) {
                return "value had already been there";
            }

            // 這裡使用prevState.options.push(option)的話就會壞掉，不知道為什麼
            // 影片說一般來說不希望手動更改state裡的值，但沒說為什麼手動更改不work
            // Indecision State:Part II 6:20
            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }

        // Component Lifecycle Functions是幾個特定名字的函數，React會在component特定的生命週期中去呼叫
        // 例如constructor()會在component被創造時呼叫, componentDidUpdate()會在component被更新後呼叫
        // 所有的Lifecycle Functions的函數內部都是可以自訂的
        // Lifecycle Functions可以傳入prevProps和prevState取得「被改動前」的props和state內容;
        // 同時函數內部可使用this.props和this.state來取得「被改動後」的props和state內容
        // Lifecycle Functions無法在Stateless Functional Component裡使用

        // 當component被渲染後

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var options = JSON.parse(localStorage.getItem("options"));

            if (options) {
                this.setState(function () {
                    return { options: options };
                });
            }
        }

        // 當component被更新後

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var data = JSON.stringify(this.state.options);
                localStorage.setItem("options", data);
            }
        }

        // 當component要被移除前

    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            console.log("我要被刪除了!");
        }
    }, {
        key: "render",
        value: function render() {
            var subtitle = "The subtitle here";

            return React.createElement(
                "div",
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOption: this.state.options.length > 0,
                    pickTodo: this.pickTodo
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    removeAll: this.removeAll,
                    removeOne: this.removeOne
                }),
                React.createElement(AddOption, {
                    addOptionArr: this.addOptionArr
                })
            );
        }
    }]);

    return Indecision;
}(React.Component);

// 如果一個react組件單純只是render jsx，沒有設定state的話，
// 我們就可以使用下面這種比較簡短的Stateless Functional Component


var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            "h2",
            null,
            props.subtitle
        )
    );
};

// 每個組件中都有一個defaultProps物件，用於設定預設的值
// 此值會被複製進組件的this.props，但若this.props裡面已存在其他值會忽略
Header.defaultProps = {
    title: "Indecision"
};

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            {
                onClick: props.pickTodo,
                disabled: !props.hasOption
            },
            "What should I do?"
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.removeAll },
            "Remove All"
        ),
        props.options.map(function (option, index) {
            return React.createElement(Option, {
                key: "option" + index,
                optionText: option,
                removeOne: props.removeOne
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "li",
            null,
            props.optionText,
            React.createElement(
                "button",
                { onClick: function onClick(event) {
                        props.removeOne(props.optionText);
                    } },
                "remove"
            )
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.state = {
            error: undefined
        };

        _this2.addOption = _this2.addOption.bind(_this2);
        return _this2;
    }

    _createClass(AddOption, [{
        key: "addOption",
        value: function addOption(event) {
            event.preventDefault();

            var option = event.target.elements.new_option;
            // String.trim()是js原生字串方法，可把字串頭尾的空白、換行字元(\n)等去除後回傳剩餘的部分
            // 該方法「不會」處理字串中間的空白、換行字元.....等
            var optionText = option.value.trim();

            var error = this.props.addOptionArr(optionText);

            // ES6新規範，當物件屬性的名字和值的名字一樣時，{ error }的寫法等同{error: error}
            this.setState(function () {
                return { error: error };
            });

            option.value = "";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.addOption },
                React.createElement(
                    "label",
                    { htmlFor: "" },
                    "Add an new todo"
                ),
                React.createElement("input", { type: "text", name: "new_option" }),
                React.createElement(
                    "button",
                    null,
                    "Submit"
                ),
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

;

ReactDOM.render(React.createElement(Indecision, null), document.getElementById("app"));
