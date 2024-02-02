export default function movePlaceholder(
	pos,
	canvasDOMInfo, // which canvas is cursor at
	bestTargetDomInfo, // closest element in canvas (null if canvas is empty)
	thickness = 2
) {
	let t = 0,
		l = 0,
		w = 0,
		h = 0,
		where = pos.where;
	const elDim = bestTargetDomInfo;
	if (elDim) {
		// If it's not in flow (like 'float' element)
		if (!elDim.inFlow) {
			w = thickness;
			h = elDim.outerHeight;
			t = elDim.top;
			l = where === 'before' ? elDim.left : elDim.left + elDim.outerWidth;
		} else {
			w = elDim.outerWidth;
			h = thickness;
			t = where === 'before' ? elDim.top : elDim.bottom;
			l = elDim.left;
		}
	} else {
		if (canvasDOMInfo) {
			t = canvasDOMInfo.top + canvasDOMInfo.padding.top;
			l = canvasDOMInfo.left + canvasDOMInfo.padding.left;
			w =
				canvasDOMInfo.outerWidth -
				canvasDOMInfo.padding.right -
				canvasDOMInfo.padding.left -
				canvasDOMInfo.margin.left -
				canvasDOMInfo.margin.right;
			h = thickness;
		}
	}
	return {
		top: `${t}px`,
		left: `${l}px`,
		width: `${w}px`,
		height: `${h}px`,
	};
}
//# sourceMappingURL=movePlaceholder.js.map
