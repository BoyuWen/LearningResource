package com;

import java.util.Scanner;

public class Palindrome {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		System.out.print("����������ֵ��1~99999��");
		int inputValue = s.nextInt();
		
		while (inputValue < 1 || inputValue > 99999) {
			System.out.println("�����ֵ������Ч��Χ,����������");
			inputValue = s.nextInt();
		} 
		int temp = inputValue;
		int reverseValue = 0;
		while (temp !=0 ) {
			reverseValue = reverseValue*10+temp%10;
			temp = temp / 10 ;
		}		
		if (reverseValue == inputValue) {
			System.out.print(inputValue +"�ǻ�����");
		} else {
			System.out.print(inputValue +"���ǻ�����");
		}
	}
 }


