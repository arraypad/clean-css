// TODO: it'd be great to merge it with the other canReorder functionality

var FLEX_PROPERTIES = /align\-items|box\-align|box\-pack|flex|justify/;

function canReorder(left, right) {
  for (var i = right.length - 1; i >= 0; i--) {
    for (var j = left.length - 1; j >= 0; j--) {
      if (!canReorderSingle(left[j], right[i]))
        return false;
    }
  }

  return true;
}

function canReorderSingle(left, right) {
  var leftName = left[0];
  var leftValue = left[1];
  var leftNameRoot = left[2];
  var leftSelector = left[5];
  var leftInSimpleSelector = left[6];
  var rightName = right[0];
  var rightValue = right[1];
  var rightNameRoot = right[2];
  var rightSelector = right[5];
  var rightInSimpleSelector = right[6];

  if (leftName == 'font' && rightName == 'line-height' || rightName == 'font' && leftName == 'line-height')
    return false;
  if (FLEX_PROPERTIES.test(leftName) && FLEX_PROPERTIES.test(rightName))
    return false;
  if (leftNameRoot != rightNameRoot)
    return true;
  if (leftName == rightName && leftNameRoot == rightNameRoot && leftValue == rightValue)
    return true;
  if (leftName != rightName && leftNameRoot == rightNameRoot && leftName != leftNameRoot && rightName != rightNameRoot)
    return true;
  if (leftName != rightName && leftNameRoot == rightNameRoot && leftValue == rightValue)
    return true;
  if (rightInSimpleSelector && leftInSimpleSelector && selectorsDoNotOverlap(rightSelector, leftSelector))
    return true;

  return false;
}

function selectorsDoNotOverlap(s1, s2) {
  for (var i = 0, l = s1.length; i < l; i++) {
    for (var j = 0, m = s2.length; j < m; j++) {
      if (s1[i][0] == s2[j][0])
        return false;
    }
  }

  return true;
}

module.exports = {
  canReorder: canReorder,
  canReorderSingle: canReorderSingle
};
