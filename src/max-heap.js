const Node = require('./node');

class MaxHeap {
	// done
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);

		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root !== null) {
			
			if (this.root.left === null) {
				let detached = this.detachRoot();
				let x = detached.data;
				this.restoreRootFromLastInsertedNode(detached);
				return x;
			}
			//console.log(this.root);
			// удалим вершину
			let detached = this.detachRoot();
			let x = detached.data;

			
			//console.log(x);
			//console.log(detached);
			this.restoreRootFromLastInsertedNode(detached);
			//console.log(detached);
			this.shiftNodeDown(this.root);
			return x;
		}
	}

	detachRoot() { // удалить корень со смещением // видимо смещение НЕ НАДО
		let oldRoot = this.root;

		if (this.root.left === null) { // если нету потомков, то удалить из this
			this.clear();
		}

		else {

			// если бы нужно было смещать на место удаленного корня
			/*this.root.priority = -1000;
			this.shiftNodeDown(this.root); // сместим корень в самый низ

			this.parentNodes.splice(this.parentNodes.indexOf(oldRoot), 1); // удалили из parentNodes
			if (this.parentNodes[0] !== oldRoot) {
				this.parentNodes.unshift(oldRoot.parent); // если его предка нету в массиве parentNodes, то вставим
			}*/

			// если не надо смещать на место удаленного корня
			if (this.parentNodes.indexOf(oldRoot) !== -1) { // удалить корень из parentNodes, если он там есть
				this.parentNodes.splice(this.parentNodes.indexOf(oldRoot), 1);
			} 

			this.root = null;
			// oldRoot.remove();
		}

		return oldRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length > 0) {
			
		
			this.root = this.parentNodes[this.parentNodes.length - 1];
			
			this.parentNodes.pop();
			if (this.root.parent === detached) { // если надо поднять первого потомка, то вершина станет в parentNode
				this.parentNodes.unshift(this.root);
			}
			else if (this.parentNodes.indexOf(this.root.parent) === -1) { // а если надо поднять не первого потомка, то в нач. массива станет первый потомок вставленного узла
				this.parentNodes.unshift(this.root.parent);
			}

			if (this.root.parent) {
				this.root.parent.removeChild(this.root); // удалить у предка последневставленного узла этот узел из наследников
			}
			

			this.root.left = detached.left;
			this.root.right = detached.right;
			this.root.parent = null;
			if (detached.left) {
				detached.left.parent = this.root;
			}
			if (detached.right) {
			detached.right.parent = this.root;
			}
		}
	}

	size() {
		let size;
		if (this.parentNodes.length === 0) {
			return 0;
		}
		else if (this.parentNodes.length === 1) {
			return 1;
		}
		else if (this.parentNodes[this.parentNodes.length - 1].parent.left === this.parentNodes[this.parentNodes.length - 1]) {
			size = (this.parentNodes.length - 1) * 2;
		}
		else {
			size = (this.parentNodes.length - 1) * 2 + 1;
		}
		return size;
	}

	isEmpty() {
		if (this.parentNodes.length > 0) {
			return false;
		}
		else return true;
	}

	// done
	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes[0] = node;
		}
		else {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right !== null) { // удалим первый узел parentNodes, если свободных мест для потомков нету
				this.parentNodes.shift();
			}

			this.parentNodes.push(node);
		}

		//this.parentNodes.push(node);

		/*for ( let i = 0; ; i++) {}
		let nodeLastIndex = this.parentNodes.length - 1;
		let nodeLast = this.parentNodes[nodeLastIndex];
		let nodeParentIndex = Math.floor((this.parentNodes.length - 2) / 2);
		let nodeParent = this.parentNodes[nodeParentIndex];
		if (nodeLast.priority > nodeParent.priority) {
			this.parentNodes[nodeParentIndex] = nodeLast;
			this.parentNodes[nodeLastIndex] = nodeParent;

			
		}*/
		//(this.parentNodes.length - 2) / 2;
		
	}

	// видимо - поднять этот элемент вверх пока не удовлетворит условию кучи(пока приоритет предка не станет больше приоритета потомка)
	shiftNodeUp(node) {
		if (node.parent !== null) {
			if (node.parent.priority < node.priority) {

				// искать в parentNodes массиве данный объект, и если он там есть, то заменить его на его предка
				if (this.parentNodes[this.parentNodes.length - 1] === node && this.parentNodes[0] === node.parent) { // если последний элемент поднимаем, то его надо поменять с первым местами
					this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0]; 
					this.parentNodes[0] = node;
				}
				else if (this.parentNodes.indexOf(node) !== -1) { // если элемент есть в массиве parentNodes, но не в конце
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				}

				node.swapWithParent();

				if (node.parent === null) { // поменять root
					this.root = node;
				}

				this.shiftNodeUp(node);


				/*console.log("JJJJJJ");
				console.log(node);
				console.log("jjjlllddd");*/

			
				/*console.log(node);
				console.log("22222222222222");*/
			}
		}
	}

	shiftNodeDown(node) {
		if (node.left !== null) {
			let x = null;
			if (node.right !== null) {
				if (node.left.priority > node.right.priority) {
					if (node.left.priority > node.priority) {

						//node.left.swapWithParent();
						x = node.left;

					}
					// иначе закончить
				}
				else {
					if (node.right.priority > node.priority) {

						//node.right.swapWithParent();
						x = node.right;

					}
					// иначе закончить
				}
			}
			else {
				if (node.left.priority > node.priority) {

					//node.left.swapWithParent();
					x = node.left;

				}
				// иначе закончить
			}
			if (x !== null) {

				if (this.parentNodes[this.parentNodes.length - 1] === x && this.parentNodes[0] === node) { // если последний элемент поднимаем, то его надо поменять с первым местами
					this.parentNodes[this.parentNodes.length - 1] = this.parentNodes[0]; 
					this.parentNodes[0] = x;
				}
				else if (this.parentNodes.indexOf(x) !== -1) { // если элемент есть в массиве parentNodes, но не в конце
					this.parentNodes[this.parentNodes.indexOf(x)] = node;
				}

				x.swapWithParent();

				if (node.parent.parent === null) { // поменять root
					this.root = node.parent;
				}

				this.shiftNodeDown(node);
			}


		}
	}
}

module.exports = MaxHeap;
