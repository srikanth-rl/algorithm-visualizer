import React, { useEffect, useState } from "react";
import "../styles/sorting.css";
import sortIcon from "../icons/sort.png";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { Button } from "../components/Btn";

var BARS = 100;
const barWidth = 15;
var SPEED = 500;

async function waitForAnimate(sp) {
  sp = sp < 5 ? 5 : sp;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, sp);
  });
}

function SortingApp() {
  const [bar, setBar] = useState([80, 40, 20, 70, 30]);
  const [sortedArray, setSortedArray] = useState([]);
  var [speed, setSpeed] = useState(SPEED);
  const [sortID, setSortID] = useState(3);

  useEffect(() => {
    init();
    popupClickHandle();
  }, []);

  const init = () => {
    var arr = [];
    for (let i = 0; i < BARS; i++) {
      let x = Math.floor(Math.random() * 1000) % 400;
      arr.push(x);
    }
    setBar(arr);
  };
  var ORGINAL_COLOR = "#3498DB";
  var COMP_COLOR = "#FF5959";
  var SORTED_COLOR = "#6C3483";
  var PIVOT_COLOR = "orange";

  const swap = (i, j, newBars) => {
    document.getElementById("bar-" + i).style.height = newBars[j] + "px";
    document.getElementById("bar-" + j).style.height = newBars[i] + "px";

    var tmp = newBars[i];
    newBars[i] = newBars[j];
    newBars[j] = tmp;
  };
  // -----------  All Sorting Algorithm  -----------
  async function bubbleSort() {
    var newBars = [...bar]; // Copy the array

    var swapped;
    do {
      swapped = false;
      for (var i = 0; i < newBars.length - 1; i++) {
        document.getElementById("bar-" + i).style.background = COMP_COLOR;
        document.getElementById("bar-" + (i + 1)).style.background = COMP_COLOR;
        await waitForAnimate(SPEED); // Control animation speed
        document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;
        document.getElementById("bar-" + (i + 1)).style.background =
          ORGINAL_COLOR;

        if (newBars[i] > newBars[i + 1]) {
          swap(i, i + 1, newBars);
          swapped = true;
        }
      }
    } while (swapped);

    // At this point, the array is sorted
    for (let i = 0; i < newBars.length; i++) {
      document.getElementById("bar-" + i).style.background = SORTED_COLOR;
    }
    setSortedArray([...newBars]);
  }


  async function selectionSort() {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 0; i < newBars.length; i++) {
      var leastIdx = i;
      document.getElementById("bar-" + leastIdx).style.background = "black";

      for (var j = i + 1; j < newBars.length; j++) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        await waitForAnimate(SPEED); // global var
        document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;

        if (newBars[j] < newBars[leastIdx]) {
          document.getElementById("bar-" + leastIdx).style.background =
            ORGINAL_COLOR;
          leastIdx = j;
          document.getElementById("bar-" + leastIdx).style.background = "black";
        }
      }
      // swap
      swap(i, leastIdx, newBars);
      document.getElementById("bar-" + leastIdx).style.background =
        ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = SORTED_COLOR;
    }
    setSortedArray([...newBars]);
  }
  const insertionSort = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 1; i < newBars.length; i++) {
      var tmp = newBars[i],
        j = i - 1;
      document.getElementById("bar-" + i).style.transform = "translateY(15px)";

      while (j >= 0 && newBars[j] > tmp) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background =
          PIVOT_COLOR;

        await waitForAnimate(SPEED);
        newBars[j + 1] = newBars[j];
        document.getElementById("bar-" + (j + 1)).style.height =
          newBars[j] + "px";
        document.getElementById("bar-" + (j + 1)).style.background =
          SORTED_COLOR;
        j--;
      }
      newBars[j + 1] = tmp;
      document.getElementById("bar-" + (j + 1)).style.height = tmp + "px";
      document.getElementById("bar-" + (j + 1)).style.background = SORTED_COLOR;
      document.getElementById("bar-" + i).style.transform = "translateY(0px)";
    }
    setSortedArray([...newBars]);
  };
  const partition = async (low, high, array) => {
    let pivot = high,
      i = low;
    document.getElementById("bar-" + pivot).style.background = PIVOT_COLOR;

    for (let j = low; j < high; j++) {
      document.getElementById("bar-" + j).style.background = COMP_COLOR;
      document.getElementById("bar-" + i).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;

      if (array[j] <= array[pivot]) {
        swap(i, j, array);
        i++;
      }
    }
    swap(i, pivot, array);
    document.getElementById("bar-" + pivot).style.background = ORGINAL_COLOR;
    return i;
  };

  const quickSort = async (low, high, array) => {
    if (low >= high) return;
    let pi = await partition(low, high, array);
    await quickSort(low, pi - 1, array);
    await quickSort(pi + 1, high, array);
  };

  const mergeSort = async (low, high, array) => {
    if (low >= high) return;
    var mid = Math.floor((low + high) / 2);
    await mergeSort(low, mid, array);
    await mergeSort(mid + 1, high, array);

    var newArr1 = [],
      newArr2 = [];
    for (let i = low; i <= mid; i++) {
      newArr1.push({ x: array[i], idx: i });
    }
    for (let i = mid + 1; i <= high; i++) {
      newArr2.push({ x: array[i], idx: i });
    }
    let i = 0,
      j = 0,
      k = low;
    while (i < newArr1.length && j < newArr2.length) {
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        COMP_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        SORTED_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        SORTED_COLOR;

      if (newArr1[i].x < newArr2[j].x) {
        array[k] = newArr1[i].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        i++;
      } else {
        array[k] = newArr2[j].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        j++;
      }
      k++;
    }
    while (i < newArr1.length) {
      array[k] = newArr1[i].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      i++;
      k++;
    }
    while (j < newArr2.length) {
      array[k] = newArr2[j].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      j++;
      k++;
    }
  };
  const heapify = async (array, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      document.getElementById("bar-" + i).style.background = COMP_COLOR;
      document.getElementById("bar-" + largest).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);

      swap(i, largest, array);

      document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;
      document.getElementById("bar-" + largest).style.background = ORGINAL_COLOR;

      await heapify(array, n, largest);
    }
  };

  const heapSort = async (array) => {
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      document.getElementById("bar-" + i).style.background = SORTED_COLOR;
      document.getElementById("bar-0").style.background = COMP_COLOR;
      await waitForAnimate(SPEED);

      swap(0, i, array);

      document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;
      document.getElementById("bar-0").style.background = ORGINAL_COLOR;

      await heapify(array, i, 0);
    }

    // Mark the first element as sorted
    document.getElementById("bar-0").style.background = SORTED_COLOR;
  };
  // -----------  End Sorting Algorithm  ----------

  const startSortingHandle = async () => {
    document.getElementsByTagName("button")[0].disabled = true;
    document.getElementsByTagName("button")[1].disabled = true;
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;

    var newBars = [];
    switch (sortID) {
      case 0:
        await bubbleSort()
        break;
      case 1:
        await selectionSort();
        break;
      case 2:
        await insertionSort();
        break;
      case 3:
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await quickSort(0, newBars.length - 1, newBars);
        break;
      case 4:
        newBars = [];
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await mergeSort(0, newBars.length - 1, newBars);
        break;
      case 5:
        newBars = [...bar];
        await heapSort(newBars);
        setSortedArray([...newBars]);
        break;
      default:
        await quickSort();
        break;
    }
    document.getElementsByTagName("button")[0].disabled = false;
    document.getElementsByTagName("button")[1].disabled = false;
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
    setSortedArray([...bar].sort((a, b) => a - b));
  };

  const rangeValueHandle = (event) => {
    SPEED = parseInt(event.target.max) - parseInt(event.target.value);
    setSpeed(event.target.valueAsNumber);
  };
  const sizeHandle = (e) => {
    BARS = parseInt(e.target.value);
    generateNewArray();
  };
  const generateNewArray = () => {
    var arr = [];
    for (let i = 0; i < BARS; i++) {
      let x = Math.floor(Math.random() * 1000) % 400;
      arr.push(x);
    }
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = ORGINAL_COLOR;
    }
    setBar(arr);
    setSortedArray([]);
  };
  const popupClickHandle = () => {
    var blur = document.getElementById("Container-blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("unActive");
  };
  return (
    <>
      <Modal className="border border-slate-600 px-10">
        <div style={{ marginRight: "20px", color: "#64748b" }}>
          <h1 className="text-2xl text-slate-700 text-center">
            Some Sorting Algorithms Tutorial
          </h1>
          <img src={sortIcon} alt="Sort Icon" />
        </div>
      </Modal>
      <div id="Container-blur" className="active">
        <Navbar msg="Sorting Algorithms"></Navbar>
        <div className="sorting-continer">
          <div className="Btn-Wrap">
            <div className="flex gap-3">
              <Button
                onClick={startSortingHandle}
                label="Start Sorting"
                isBgColor
              />
              <Button onClick={generateNewArray} label="Generate New" />
              <select
                className="form-select"
                value={sortID}
                onChange={(e) => {
                  setSortID(parseInt(e.target.value));
                  generateNewArray();
                }}
                id="num1"
                name="num1"
              >
                <option value="0">Bubble Sort</option>
                <option value="1">Selection Sort</option>
                <option value="2">Insertion Sort</option>
                <option value="3">Quick Sort</option>
                <option value="4">Merge Sort</option>
                <option value="5">Heap Sort</option>
              </select>
            </div>
            <div className="st-speed-range">
              <div className="st-speed-range-lavel">
                <label className="sorting-label" htmlFor="range1">
                  Speed:{" "}
                </label>
              </div>
              <div>
                <input
                  type="range"
                  onChange={rangeValueHandle}
                  name="range1"
                  id="range1"
                  min="1"
                  value={speed}
                  max="1000"
                  step="1"
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="num">Choose Size: </label>
              <select
                className="form-select"
                value={bar.length}
                onChange={sizeHandle}
                id="num"
                name="num"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="350">350</option>
              </select>
            </div>
          </div>
          <div className="wrapperBar">
            {bar.map((item, id) => {
              return (
                <div
                  className="bar"
                  id={"bar-" + id}
                  key={id}
                  style={{ width: barWidth, height: item }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SortingApp;
