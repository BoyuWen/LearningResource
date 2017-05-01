package com;

import java.util.Scanner;

public class BubbleSort {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		final int MAX_ELEMENT_NUMBER = 10;
		int[] a = new int[MAX_ELEMENT_NUMBER];
		Scanner s = new Scanner(System.in);

		// 从控制台输入10个元素
		for (int i = 0; i < MAX_ELEMENT_NUMBER; i++) {
			System.out.println("输入第" + i + "个值：");
			a[i] = s.nextInt();
		}

		// k用来存放排序的趟数
		int k = 0;
		int j = 0;
		int temp = 0;
		for (k = 1; k < MAX_ELEMENT_NUMBER; k++) {
			for (j = MAX_ELEMENT_NUMBER - 1; j >= k; j--) {
				if(a[j] < a[j-1]){
					temp = a[j];
					a[j] = a[j-1];
					a[j-1] = temp;
				}
			}
		}
		
		for(int i = 0; i < MAX_ELEMENT_NUMBER; i++){
			System.out.println("第"+i+"个元素的值为"+a[i]);
		}
	}

}
