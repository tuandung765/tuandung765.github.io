import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class Thiep2010 extends JPanel implements ActionListener {
    private String message = "Chúc mừng ngày Phụ nữ Việt Nam 20/10!\nChúc bạn luôn xinh đẹp, hạnh phúc và tràn đầy yêu thương ❤️";
    private String displayed = "";
    private int index = 0;
    private Timer timer;
    private JButton revealBtn;
    private ArrayList<Petal> petals;
    private Random rand = new Random();

    public Thiep2010() {
        setBackground(new Color(255, 230, 240));

        revealBtn = new JButton("Mở lời chúc");
        revealBtn.setFont(new Font("SansSerif", Font.BOLD, 18));
        revealBtn.setBackground(new Color(255, 150, 170));
        revealBtn.setForeground(Color.WHITE);
        revealBtn.addActionListener(e -> startTypewriter());

        petals = new ArrayList<>();
        for (int i = 0; i < 80; i++) petals.add(new Petal());

        timer = new Timer(50, this);
        timer.start();

        setLayout(new BorderLayout());
        add(revealBtn, BorderLayout.SOUTH);
    }

    private void startTypewriter() {
        new Thread(() -> {
            displayed = "";
            for (index = 0; index < message.length(); index++) {
                displayed += message.charAt(index);
                repaint();
                try { Thread.sleep(50); } catch (InterruptedException ignored) {}
            }
        }).start();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        for (Petal p : petals) p.update(getWidth(), getHeight());
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        // Hoa rơi
        Graphics2D g2d = (Graphics2D) g;
        for (Petal p : petals) p.draw(g2d);

        // Lời chúc
        g2d.setColor(new Color(255, 80, 120));
        g2d.setFont(new Font("Serif", Font.PLAIN, 22));

        int y = 120;
        for (String line : displayed.split("\n")) {
            g2d.drawString(line, 50, y);
            y += 30;
        }
    }

    static class Petal {
        double x, y, vy, vx, size;
        Color color;
        Random rand = new Random();

        Petal() {
            reset();
        }

        void reset() {
            x = rand.nextInt(800);
            y = rand.nextInt(600) - 600;
            vy = 0.5 + rand.nextDouble();
            vx = rand.nextDouble() - 0.5;
            size = 6 + rand.nextDouble() * 10;
            color = new Color(255, 100 + rand.nextInt(100), 150 + rand.nextInt(100), 180);
        }

        void update(int w, int h) {
            x += vx;
            y += vy;
            if (y > h + 20) reset();
        }

        void draw(Graphics2D g2d) {
            g2d.setColor(color);
            g2d.fillOval((int)x, (int)y, (int)size, (int)(size * 0.6));
        }
    }

    public static void main(String[] args) {
        JFrame f = new JFrame("Thiệp 20/10 Lãng Mạn 💖");
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setSize(800, 600);
        f.setLocationRelativeTo(null);
        f.setResizable(false);
        f.setContentPane(new Thiep2010());
        f.setVisible(true);
    }
}
