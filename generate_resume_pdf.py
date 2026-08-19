import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY

def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#1E1B4B")     # Dark Navy
    ACCENT = colors.HexColor("#4F46E5")      # Indigo / Violet
    TEXT_DARK = colors.HexColor("#1F2937")   # Gray 800
    TEXT_MUTED = colors.HexColor("#4B5563")  # Gray 600
    BORDER_COLOR = colors.HexColor("#E5E7EB") # Gray 200

    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=ACCENT
    )

    contact_style = ParagraphStyle(
        'ContactBar',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_MUTED
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=PRIMARY,
        spaceAfter=3,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.2,
        textColor=TEXT_DARK,
        alignment=TA_LEFT
    )

    summary_style = ParagraphStyle(
        'SummaryText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.5,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=PRIMARY
    )

    job_company_style = ParagraphStyle(
        'JobCompany',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=ACCENT
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_MUTED,
        alignment=TA_RIGHT
    )

    bullet_style = ParagraphStyle(
        'BulletItem',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12,
        textColor=TEXT_DARK,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=2
    )

    story = []

    # ── HEADER ──
    story.append(Paragraph("Umar Farid", name_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("Software Developer", title_style))
    story.append(Spacer(1, 4))
    
    contact_text = (
        '📞 <b>+92 302 7896793</b> &nbsp;|&nbsp; '
        '📧 <a href="mailto:umarfarid034@gmail.com"><font color="#4F46E5"><u>umarfarid034@gmail.com</u></font></a> &nbsp;|&nbsp; '
        '💼 <a href="https://linkedin.com/in/umar-farid-dev"><font color="#4F46E5"><u>linkedin.com/in/umar-farid-dev</u></font></a> &nbsp;|&nbsp; '
        '🐙 <a href="https://github.com/umarfaridse"><font color="#4F46E5"><u>github.com/umarfaridse</u></font></a> &nbsp;|&nbsp; '
        '📍 Sahiwal, Pakistan'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=8, spaceBefore=0))

    # ── SUMMARY ──
    story.append(Paragraph("SUMMARY", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER_COLOR, spaceAfter=4, spaceBefore=0))
    summary_p = (
        "Computer Science graduate from COMSATS University Islamabad with hands-on experience building "
        "full-stack web applications using ASP.NET Core, C#, Entity Framework Core, and React.js. "
        "Completed the .NET Full Stack Foundation certification and actively developing two production-level projects. "
        "Seeking a .NET internship or junior developer role to contribute to real-world projects, apply strong "
        "OOP and REST API skills, and grow within an experienced engineering team."
    )
    story.append(Paragraph(summary_p, summary_style))
    story.append(Spacer(1, 7))

    # ── HIGHLIGHTS / TECHNICAL SKILLS ──
    story.append(Paragraph("HIGHLIGHTS &amp; TECHNICAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER_COLOR, spaceAfter=4, spaceBefore=0))
    skills = [
        "<b>Back-End &amp; Core:</b> ASP.NET Core, C#, Entity Framework Core, REST API Development, OOP Principles, LINQ",
        "<b>Front-End:</b> React.js, JavaScript, HTML5, CSS3, Tailwind CSS",
        "<b>Databases:</b> SQL Server, Firebase (basic)",
        "<b>Tools &amp; Workflow:</b> Git, GitHub, Visual Studio, VS Code, Postman, Swagger, MVC Architecture"
    ]
    for s in skills:
        story.append(Paragraph(f"• &nbsp;{s}", bullet_style))
    story.append(Spacer(1, 7))

    # ── EXPERIENCE ──
    story.append(Paragraph("EXPERIENCE", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER_COLOR, spaceAfter=5, spaceBefore=0))

    # Experience 1: Software Developer Intern
    exp1_left = Paragraph("<b>Software Developer Intern</b> — <font color='#4F46E5'><b>Noorwave, Sahiwal</b></font> <font color='#6B7280'>(Onsite)</font>", job_title_style)
    exp1_right = Paragraph("<b>Jan 2026 – June 2026</b>", date_style)
    exp1_table = Table([[exp1_left, exp1_right]], colWidths=[380, 160])
    exp1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(exp1_table)
    
    exp1_bullets = [
        "Served as a Software Developer Intern collaborating on application features and architecture.",
        "Worked on a demo project called <b>\"Expense Manager\"</b> developed in <b>React</b> to boost learning and proficiency across required frontend development platforms.",
        "Worked on a demo project called <b>\"School Management System\"</b> developed in <b>WPF</b> to get hands-on experience in desktop-based software development."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"• &nbsp;{b}", bullet_style))
    story.append(Spacer(1, 6))

    # Experience 2: Final Year Project
    exp2_left = Paragraph("<b>Final Year Project</b> — <font color='#4F46E5'><b>Home Service Provider (Service Marketplace)</b></font>", job_title_style)
    exp2_right = Paragraph("<b>COMSATS University</b>", date_style)
    exp2_table = Table([[exp2_left, exp2_right]], colWidths=[380, 160])
    exp2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(exp2_table)

    exp2_bullets = [
        "Developed a full-stack service marketplace connecting customers with verified local service providers through intelligent AI-powered matching.",
        "Built a decoupled architecture using <b>React.js, ASP.NET Core Web API, Entity Framework Core, and SQL Server</b>.",
        "Integrated <b>OpenAI API</b> to analyze customer requirements, provider profiles, ratings, and reviews for intelligent service provider recommendations."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"• &nbsp;{b}", bullet_style))
    story.append(Spacer(1, 7))

    # ── EDUCATION ──
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER_COLOR, spaceAfter=5, spaceBefore=0))
    
    edu_left = Paragraph("<b>Bachelor of Science — Computer Science</b> (CGPA: <b>3.31 / 4.00</b>)<br/><font color='#4F46E5'>COMSATS University Islamabad, Sahiwal Campus</font>", body_style)
    edu_right = Paragraph("<b>2022 – 2026</b>", date_style)
    edu_table = Table([[edu_left, edu_right]], colWidths=[380, 160])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 7))

    # ── CERTIFICATIONS ──
    story.append(Paragraph("CERTIFICATIONS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=BORDER_COLOR, spaceAfter=5, spaceBefore=0))
    certs = [
        ("<b>.NET Full Stack Foundation</b> — Board Infinity", "Aug 2025"),
        ("<b>Frontend Development using React</b> — Board Infinity", "2025"),
        ("<b>Getting Started with Data Analytics on AWS</b> — Amazon Web Services", "Jul 2025"),
        ("<b>Backend Development: Node.js, Express, MongoDB &amp; REST APIs</b> — Board Infinity", "2025")
    ]
    for cert_title, cert_date in certs:
        c_left = Paragraph(f"• &nbsp;{cert_title}", bullet_style)
        c_right = Paragraph(f"<b>{cert_date}</b>", date_style)
        c_table = Table([[c_left, c_right]], colWidths=[430, 110])
        c_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(c_table)

    doc.build(story)
    print(f"Successfully generated PDF at: {output_path}")

if __name__ == "__main__":
    base_dir = r"c:\Users\dell\umar-portfolio"
    out_pdf = os.path.join(base_dir, "Umar_Farid_Resume.pdf")
    build_pdf(out_pdf)

    # Sync to all target paths
    targets = [
        os.path.join(base_dir, "Profile.pdf"),
        os.path.join(base_dir, "frontend", "public", "Umar_Farid_Resume.pdf"),
        os.path.join(base_dir, "frontend", "public", "Profile.pdf"),
    ]
    for target in targets:
        shutil.copyfile(out_pdf, target)
        print(f"Synced PDF to: {target}")
