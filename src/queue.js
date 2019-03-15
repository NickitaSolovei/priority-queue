const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() < this.maxSize) { // если меньше maxSize
			this.heap.push(data, priority);
		}
		else { 
			throw new error;
		}
	}

	shift() {
		if (this.heap.parentNodes.length > 0) {
			return this.heap.pop();
		}
		else throw new error;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
