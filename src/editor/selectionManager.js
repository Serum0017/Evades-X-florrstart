// TODO:
// basically in order to move obstacles, we want to be able to select things. Now how do we do this? 
// we treat the mouse like an object in the environment. When it's intersecting with an obstacle and
// mouse is down, then we check for collisions. We loop backwards through obstacles (to select the
// one that appears last on the render order) and activate drag if so. Drag will have snap system
// but for now we can just keep track of the delta and move the obstacle accordingly. Mouse positon
// should be updated if either the camera or the mouse moves.