class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node; // а в parent добавить не надо?
			/*пробую*/ node.parent = this;
		}
		else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}	
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		}
		else if (this.right === node) {
			this.right = null;
			node.parent = null;
		}
		else {
			throw new error;
		}
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
			this.parent = null;
		}
	}

	swapWithParent() {
		if (this.parent !== null) {
			// this - существующий дочерний объект
			let par = this.parent; // ссылка на существующий родительский объект
			let parClone = Object.assign({}, par);
			let childClone =  Object.assign({}, this);

			if (parClone.left === this) { // Тут ошибка
				this.left = par;
				par.left = childClone.left;
				
				this.right = parClone.right;
				par.right = childClone.right;
				
				if (parClone.right !== null) {
					parClone.right.parent = this; // х3.parent указываем на х2 вместо х1
				}
			}
			else {
				this.right = par;
				par.right = childClone.right;

				this.left = parClone.left;
				par.left = childClone.left;

				if (parClone.left !== null) {
					parClone.left.parent = this; // х3.parent указываем на х2 вместо х1
				}
			}

			this.parent = parClone.parent;
			par.parent = this;

			if (childClone.left !== null) {
				childClone.left.parent = par; // х4.parent направляем на х1 вместо х2
			}
			if (childClone.right !== null) {
				childClone.right.parent = par; // х5.parent направляем на х1 вместо х2
			}
			
			
			if (parClone.parent !== null) {
				// parClone.parent.removeChild(par); // х6 - удаляем ссылку на х1 и ставим вместо нее ссылку на х2
				// parClone.parent.appendChild(this);

				if (parClone.parent.left === par) {
					parClone.parent.left = this;
				}
				if (parClone.parent.right === par) {
					parClone.parent.right = this;
				}
			}
			
		}
	}
}

module.exports = Node;
