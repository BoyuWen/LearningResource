package bean;

public class EnumTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		WeekDay wd = WeekDay.Mon;
		printWeekDay(wd);
	}

	public static void printWeekDay(WeekDay day) {
		switch (day) {
		case Mon:
			System.out.println("����һ");
			break;
		case Fri:
			System.out.println("������");
			break;
		default:
			System.out.println("����");
			break;

		}

	}

}
