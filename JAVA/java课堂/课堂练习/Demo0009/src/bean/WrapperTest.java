package bean;

import bean.Student.Date;

public class WrapperTest {
	public static void main(String[] args){
		//������װ�����Ͷ�������ַ�ʽ
		Integer i1 = new Integer(3);  
		Integer i2 = Integer.valueOf(3);
		//Double
		
		//
		int i3 = i1.intValue();
		
		
		Student stu = new Student("zz",1984,12,3);
		
		Date d = stu.new Date(1976,1,2);
		
		
	}
}
