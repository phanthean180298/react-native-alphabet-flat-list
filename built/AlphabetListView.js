"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_native_1 = require("react-native");
const SectionListItem_1 = require("./SectionListItem");
const Toast_1 = require("./Toast");
const initState = {
    selectAlphabet: "",
    itemHeight: 0,
    lastIndex: -1
};
class AlphabetListView extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = initState;
        this.onTouchChange = (e, gestureState) => {
            const itemHeight = this.props.contentHeight / this.props.titles.length;
            const event = e.nativeEvent || {};
            const index = Math.floor((event.pageY - this.props.pageY) / itemHeight);
            if (index!==this.state.lastIndex&& index >= 0 && index <= this.props.titles.length - 1) {
                this.props.hapticFeedback && this.props.hapticFeedback()
                const enableIndex = this.props.enableTitles.findIndex(e=>e===this.props.titles[index])
                this.props.onSelect && this.props.enableTitles[enableIndex] && this.props.onSelect(enableIndex);
                this.updateSelectAlphabet(this.props.titles[index]);
                if (this.props.alphabetToast) {
                    react_native_1.InteractionManager.runAfterInteractions(() => {
                        Toast_1.default.show(this.props.titles[index]);
                    });
                }
            }
            this.setState({lastIndex:index})
        };
        this.responder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => true,
            onPanResponderGrant: this.onTouchChange,
            onPanResponderMove: this.onTouchChange,
        });
    }
    componentDidMount() {
        this.initData(this.props);
    }
    componentWillReceiveProps(props) {
        this.initData(props);
    }
    updateSelectAlphabet(selectAlphabet) {
        this.setState({
            selectAlphabet: selectAlphabet,
        });
    }
    initData({ titles, contentHeight }) {
        this.setState({
            selectAlphabet: titles[0],
            itemHeight: contentHeight / titles.length,
        });
    }
    render() {
        const { selectAlphabet, itemHeight } = this.state;
        if (itemHeight < 13) {
            return null;
        }
        const { topPosition, contentHeight, titles } = this.props;
        return (<react_native_1.View style={{
            position: "absolute",
            top: topPosition,
            right: 5,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            height: contentHeight,
        }} {...this.responder.panHandlers}>
        {titles.map((title) => (<SectionListItem_1.default activeSectionColor={this.props.activeSectionColor} sectionColor={this.props.sectionColor} key={title} height={itemHeight} title={title} active={selectAlphabet === title}/>))}
      </react_native_1.View>);
    }
}
exports.default = AlphabetListView;
//# sourceMappingURL=AlphabetListView.js.map